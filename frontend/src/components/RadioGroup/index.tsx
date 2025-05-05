import React, { useState } from 'react';
import styles from './styles.module.css'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Divider,
  Typography,
  InputAdornment,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LockOutlineIcon from '@mui/icons-material/LockOutline';

export default function RadioButtonsGroup() {
  const [value, setValue] = useState('pix');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardName, setCardName] = useState('');

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setValue(event.target.value);
  };

  const handleAddCard = () => {
    if (cardName.trim()) {
      const newCard = {
        id: `card-${cards.length + 1}`,
        label: `Cartão: ${cardName}`,
      };
      //setCards([...cards, newCard]);
      setValue(newCard.id);
      setCardName('');
      setDialogOpen(false);
    }
  };

  return (
    <FormControl fullWidth>
      <RadioGroup value={value} onChange={handleChange}>
        <FormControlLabel value="pix" control={<Radio />} label="Pix" className={styles.option} />
        <Divider />
        {cards.map((card) => (
          <>
            <FormControlLabel
                key={1}
                value={1}
                control={<Radio />}
                label={1} 
                className={styles.option}
                />
            <Divider />
        </>
        ))}
        
      </RadioGroup>

      <Button
        variant="text"
        color="primary"
        onClick={() => setDialogOpen(true)}
        sx={{ mt: 1 }}
      >
        Adicionar Cartão de Crédito
      </Button>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Adicionar Cartão</DialogTitle>
        <DialogContent dividers>
            <Typography>Número do Cartão</Typography>
            <TextField
                autoFocus
                margin="dense"
                fullWidth
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CreditCardIcon />
                        </InputAdornment>
                      ),
                    },
                }}
            />
            <div className={styles.formContainer}>
                <div>
                    <Typography>Validade (MM/AA)</Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        slotProps={{
                            input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarTodayIcon />
                                </InputAdornment>
                            ),
                            },
                        }}
                    />
                </div>
                <div>
                    <Typography>Código de segurança</Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        slotProps={{
                            input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlineIcon />
                                </InputAdornment>
                            ),
                            },
                        }}
                    />
                </div>
            </div>
            <Typography>Nome Impresso no Cartão</Typography>
            <TextField
                autoFocus
                margin="dense"
                fullWidth
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
            />
            <Typography>CPF/CNPJ do titular</Typography>
            <TextField
                autoFocus
                margin="dense"
                fullWidth
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleAddCard} variant='contained'>Salvar</Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  );
}
