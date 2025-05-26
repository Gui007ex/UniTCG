import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Typography,
  Avatar,
  Button,
  Divider
} from '@mui/material';
import RadioGroupWithFields, { PaymentInfo } from '../RadioGroup';
import AppBar from '../AppBar';
import Toolbar from '@mui/material/Toolbar';
import Footer from '../Footer';
import styles from './styles.module.css';

interface LocationState {
  id: string;
  code: string;
  name: string;
  imgUrl: string;
  price: number;
  dealerName: string;
  description: string;
  dealerNumber: string;
}

const baseUrl = 'http://localhost:8080';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState };

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({ type: 'pix' });

  useEffect(() => {
    // Bloqueia a carta ao entrar na página
    const lockCarta = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/carta/lock/${state.id}`, { method: 'POST' });
        if (!res.ok) throw new Error('Falha ao bloquear carta');
      } catch (err) {
        console.error(err);
        alert('Não foi possível bloquear a carta para compra.');
        navigate('/main'); // volta para main caso falhe
      }
    };

    lockCarta();

    // Desbloqueia a carta ao sair da página
    return () => {
      fetch(`${baseUrl}/api/carta/unlock/${state.id}`, { method: 'POST' }).catch(console.error);
    };
  }, [state.id, navigate]);

  const handleConfirm = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      alert('Faça login');
      return;
    }

    try {
      const paymentRes = await fetch(`${baseUrl}/api/pagamento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: paymentInfo.type,
          param: [
            user.name,
            paymentInfo.cvc || '123',
            paymentInfo.cardNumber || '1234123412341234',
            paymentInfo.expiry || '05/27'
          ]
        })
      });

      if (!paymentRes.ok) throw new Error(await paymentRes.text());

      const compraRes = await fetch(
        `${baseUrl}/api/compras/${state.id}/${user.id}`,
        { method: 'POST' }
      );

      if (!compraRes.ok) throw new Error('Erro ao concluir compra');

      alert('Compra efetuada!');
      navigate('/main');
    } catch (err) {
      console.error(err);
      alert('Erro ao efetuar pagamento');
    }
  };

  const isCardValid =
    paymentInfo.type === 'creditcard' &&
    paymentInfo.cardNumber?.length === 16 &&
    paymentInfo.expiry?.length === 5 &&
    paymentInfo.cvc?.length === 3;

  return (
    <div className={styles.app}>
      <AppBar />
      <Toolbar />
      <div className={styles.appInfo}>
        <Typography variant="h4">Confirme sua compra</Typography>
        <div className={styles.container}>
          <div className={styles.containerDiv1}>
            <Typography variant="h5">Forma de pagamento</Typography>
            <RadioGroupWithFields onPaymentInfoChange={setPaymentInfo} />
          </div>
          <Divider orientation="vertical" flexItem />
          <div className={styles.containerDiv2}>
            <Typography variant="h5">Resumo</Typography>
            <div className={styles.containerInfo}>
              <img
                src={state.imgUrl}
                alt={state.name}
                style={{ width: 60, height: 90, objectFit: 'cover', borderRadius: 4 }}
              />
              <Typography variant="h6">
                {state.name} ({state.code})
              </Typography>
              <Divider flexItem sx={{ my: 1 }} />
              <Avatar>{state.dealerName.charAt(0)}</Avatar>
              <Typography>{state.dealerName}</Typography>
              {state.dealerNumber && (
              <Typography variant="body2" color="text.secondary">
                Contato para recebimento:{' '}
                <a
                  href={`https://wa.me/${state.dealerNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#25D366', textDecoration: 'none', fontWeight: 500 }}
                >
                  {state.dealerNumber}
                </a>
              </Typography>
            )}
              <Divider flexItem sx={{ my: 1 }} />
              <Typography><strong>Total a pagar</strong></Typography>
              <Typography>R$ {state.price.toFixed(2)}</Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleConfirm}
                disabled={
                  paymentInfo.type === 'creditcard' ? !isCardValid : false
                }
              >
                Confirmar pagamento
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
