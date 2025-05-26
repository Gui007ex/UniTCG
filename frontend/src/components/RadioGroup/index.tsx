import React, { useState } from 'react';
import styles from './styles.module.css';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Divider,
  InputAdornment,
  Box
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LockOutlineIcon from '@mui/icons-material/LockOutline';

export type PaymentInfo = {
  type: 'pix' | 'creditcard';
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
};

interface Props {
  onPaymentInfoChange: (info: PaymentInfo) => void;
}

export default function RadioGroupWithFields({ onPaymentInfoChange }: Props) {
  const [value, setValue] = useState<'pix' | 'creditcard'>('pix');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value as 'pix' | 'creditcard';
    setValue(selected);
    onPaymentInfoChange({ type: selected });
  };

  const handleFieldChange = (field: 'cardNumber' | 'expiry' | 'cvc', val: string) => {
    if (field === 'cardNumber') setCardNumber(val);
    if (field === 'expiry') setExpiry(val);
    if (field === 'cvc') setCvc(val);

    onPaymentInfoChange({
      type: 'creditcard',
      cardNumber: field === 'cardNumber' ? val : cardNumber,
      expiry: field === 'expiry' ? val : expiry,
      cvc: field === 'cvc' ? val : cvc,
    });
  };

  const cardNumberError = cardNumber.length > 0 && cardNumber.length < 16;
  const expiryError = expiry.length > 0 && !/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiry);
  const cvcError = cvc.length > 0 && cvc.length < 3;

  return (
    <FormControl fullWidth>
      <RadioGroup value={value} onChange={handleChange}>
        <FormControlLabel value="pix" control={<Radio />} label="Pix" className={styles.option} />
        <Divider sx={{ my: 1 }} />
        <FormControlLabel
          value="creditcard"
          control={<Radio />}
          label="Cartão de Crédito"
          className={styles.option}
        />
      </RadioGroup>

      {value === 'creditcard' && (
        <Box mt={2} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Número do Cartão"
            fullWidth
            value={cardNumber}
            onChange={(e) => handleFieldChange('cardNumber', e.target.value)}
            error={cardNumberError}
            helperText={cardNumberError ? 'Informe os 16 dígitos do cartão' : ''}
            inputProps={{ maxLength: 16 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box display="flex" gap={2}>
            <TextField
              label="Validade (MM/AA)"
              fullWidth
              value={expiry}
              onChange={(e) => handleFieldChange('expiry', e.target.value)}
              error={expiryError}
              helperText={expiryError ? 'Formato MM/AA' : ''}
              inputProps={{ maxLength: 5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="CVC"
              fullWidth
              value={cvc}
              onChange={(e) => handleFieldChange('cvc', e.target.value)}
              error={cvcError}
              helperText={cvcError ? 'Informe 3 dígitos' : ''}
              inputProps={{ maxLength: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      )}
    </FormControl>
  );
}