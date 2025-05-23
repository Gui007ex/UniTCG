import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Typography, Avatar, Button, Divider
} from '@mui/material';
import RadioGroup from '../RadioGroup';
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
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState };

  const handleConfirm = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) { alert('Faça login'); return; }

    try {
      const res = await fetch(
        `http://3.148.180.16:8080/api/compras/${state.id}/${user.id}`,
        { method:'POST' }
      );
      if (!res.ok) throw new Error(res.statusText);
      alert('Compra efetuada!');
      navigate('/main');
    } catch {
      alert('Erro ao efetuar compra');
    }
  };

  return (
    <div className={styles.app}>
      <AppBar/><Toolbar/>
      <div className={styles.appInfo}>
        <Typography variant="h4">Confirme sua compra</Typography>
        <div className={styles.container}>
          <div className={styles.containerDiv1}>
            <Typography variant="h5">Forma de pagamento</Typography>
            <RadioGroup />
          </div>
          <Divider orientation="vertical" flexItem />
          <div className={styles.containerDiv2}>
            <Typography variant="h5">Resumo</Typography>
            <div className={styles.containerInfo}>
              <img src={state.imgUrl} alt={state.name}
                style={{ width:60, height:90, objectFit:'cover', borderRadius:4}} />
              <Typography variant="h6">{state.name} ({state.code})</Typography>
              <Divider flexItem sx={{ my:1 }}/>
              <Avatar>{state.dealerName.charAt(0)}</Avatar>
              <Typography>{state.dealerName}</Typography>
              <Divider flexItem sx={{ my:1 }}/>
              <Typography><strong>Total a pagar</strong></Typography>
              <Typography>R$ {state.price.toFixed(2)}</Typography>
              <Button fullWidth variant="contained" sx={{ mt:2 }}
                onClick={handleConfirm}>
                Confirmar pagamento
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
