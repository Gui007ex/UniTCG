import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface Props {
  open: boolean;
  onClose: () => void;
  id: string;
  code: string;
  name: string;
  imgUrl: string;
  price: number;
  description: string;
  dealerName: string;
  dealerNumber: string;
}

export default function CustomizedDialog({
  open,
  onClose,
  id,
  code,
  name,
  imgUrl,
  price,
  description,
  dealerNumber,
  dealerName,
}: Props) {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isDealer = user ? user.name === dealerName : false;

  const handleBuy = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/carta/${id}`);
      const data = await response.json();

      if (data.locked) {
        alert('Esta carta está indisponível no momento.');
        window.location.reload();
        return;
      }

      onClose();
      navigate('/payment', {
        state: { id, code, name, imgUrl, price, dealerName, dealerNumber, description },
      });
    } catch (error) {
      console.error('Erro ao verificar disponibilidade da carta:', error);
      alert('Erro ao verificar disponibilidade. Tente novamente.');
    }
  };

  return (
    <BootstrapDialog onClose={onClose} open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Detalhes
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers className={styles.cardContainer}>
        <div className={styles.card}>
          <img src={imgUrl} alt={name} className={styles.img} />
          <div className={styles.description}>
            <Typography variant="h5" gutterBottom>
              <strong>{name}</strong>
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Código: {code}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {description}
            </Typography>
          </div>
        </div>

        <Typography variant="h4" gutterBottom>
          <strong>R$ {price.toFixed(2)}</strong>
        </Typography>

        <div className={styles.avatar}>
          <Avatar>{dealerName.charAt(0).toUpperCase()}</Avatar>
          <Typography variant="body1" gutterBottom>
            {dealerName}
          </Typography>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          autoFocus
          onClick={handleBuy}
          variant="outlined"
          className={styles.shoppingCart}
          disabled={isDealer}
        >
          <AddShoppingCartIcon fontSize="small" />
          {isDealer ? 'Seu Anúncio' : 'Comprar'}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}