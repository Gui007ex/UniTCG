import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import styles from './styles.module.css';
import { Avatar } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';

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
  name: string;
  image: string;
  price: string;
  description: string;
  dealerName: string; // nome do usuário que está vendendo a carta
}

export default function CustomizedDialogs({
  open,
  onClose,
  name,
  image,
  price,
  description,
  dealerName,
}: Props) {
  const navigate = useNavigate();

  const handleBuy = () => {
    onClose();
    navigate('/payment');
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
          <img src={image} alt={name} className={styles.img} />
          <div className={styles.description}>
            <Typography variant="h5" gutterBottom><strong>{name}</strong></Typography>
            <Typography variant="body1" gutterBottom>
              {description}
            </Typography>
          </div>
        </div>

        <Typography variant="h4" gutterBottom><strong>{price}</strong></Typography>

        <div className={styles.avatar}>
          <Avatar>{dealerName?.[0]?.toUpperCase()}</Avatar>
          <Typography variant="body1" gutterBottom>{dealerName}</Typography>
        </div>
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleBuy} variant='outlined' className={styles.shoppingCart}>
          <AddShoppingCartIcon fontSize='small' />
          Comprar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}