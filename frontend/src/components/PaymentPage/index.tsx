// frontend/src/components/PaymentPage/index.tsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'

import AppBar from '../AppBar'
import Toolbar from '@mui/material/Toolbar'
import Footer from '../Footer'
import { Avatar, Box, Button, Divider, Typography } from '@mui/material'
import RadioGroup from '../RadioGroup'

import { fetchCartas, deleteCarta } from '../../services/api'
import { Carta } from '../../types/Card'

function PaymentPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [carta, setCarta] = useState<Carta | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('ID da carta não informado.')
      setLoading(false)
      return
    }
    fetchCartas()
      .then(list => {
        const found = list.find(c => c.id === id)
        if (!found) throw new Error('Carta não encontrada.')
        setCarta(found)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const handleConfirm = async () => {
    if (!carta) return
    try {
      await deleteCarta(carta.id)
      navigate('/profile')   // ajuste para a rota de listagem que você preferir
    } catch (err: any) {
      alert(`Falha ao excluir carta: ${err.message}`)
    }
  }

  if (loading) return <div>Carregando...</div>
  if (error)   return <div>Erro: {error}</div>
  if (!carta) return <div>Carta não encontrada.</div>

  return (
    <div className={styles.app}>
      <AppBar/>
      <Toolbar/>

      <div className={styles.appInfo}>
        <Typography variant='h4' gutterBottom>
          Confirme sua compra
        </Typography>

        <div className={styles.container}>
          {/* === Coluna de pagamento === */}
          <div className={styles.containerDiv1}>
            <Typography variant='h5'>Forma de pagamento</Typography>
            <RadioGroup/>
          </div>

          <Divider orientation="vertical" flexItem />

          {/* === Coluna de resumo === */}
          <div className={styles.containerDiv2}>
            <Typography variant='h5' gutterBottom>Resumo</Typography>

            <div className={styles.containerInfo}>
              {/* Imagem e título da carta */}
              <div className={styles.title}>
                <img
                  src={carta.imgUrl}
                  alt={carta.name}
                  style={{ width: 60, height: 90, objectFit: 'cover' }}
                />
                <Typography variant='h6'>{carta.name}</Typography>
              </div>

              <Divider flexItem />

              {/* Avatar do usuário (mantive o seu Avatar estático, caso queira carregar o nome real troque aqui) */}
              <div className={styles.avatar}>
                <Avatar/>
                <Typography variant="body1" gutterBottom>
                  Nome de usuário
                </Typography>
              </div>

              <Divider flexItem />

              {/* Preço */}
              <div className={styles.price}>
                <Typography variant='h6'><strong>Total a pagar</strong></Typography>
                <Typography variant='h6'>
                  R$ {Number(carta.price).toFixed(2)}
                </Typography>
              </div>

              {/* Botão que exclui e redireciona */}
              <Box sx={{ mt: 2 }}>
                <Button
                  variant='contained'
                  fullWidth
                  onClick={handleConfirm}
                >
                  Confirmar pagamento
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default PaymentPage
