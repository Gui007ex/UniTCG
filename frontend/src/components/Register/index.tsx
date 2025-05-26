import styles from './styles.module.css';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [numberError, setNumberError] = useState('');

    const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
    };

    const validatePhoneNumber = (phone: string) => {
    // Aceita formato +5511999998888 ou 5511999998888 (com 12 ou mais dígitos)
    const clean = phone.replace(/\s/g, '');
    const regex = /^(\+)?\d{12,}$/;
    return regex.test(clean);
    };

    const handleRegister = async () => {
    if (!validatePhoneNumber(number)) {
        setNumberError('Número inválido. Ex: +5511999998888');
        return;
    }

    try {
        await axios.post('http://localhost:8080/api/usuario', {
        name: username,
        email,
        password,
        number: number.replace(/\D/g, '') // só envia os dígitos
        });

        alert('Conta criada com sucesso!');
        navigate('/');
    } catch (error: any) {
        console.error('Erro ao criar conta:', error);
        alert('Erro ao criar conta. Verifique os dados informados.');
    }
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Só permite dígitos e + no início
    if (/^[+\d\s]*$/.test(value)) {
        setNumber(value);
        setNumberError('');
    }
    };

    return (
    <div className={styles.app}>
        <div className={styles.center}>
        <AccountCircleIcon fontSize='large' className={styles.title} />
        <Typography variant='h4' className={styles.title}>
            Criar Conta
        </Typography>

        <TextField
            label="Nome de Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <PersonIcon />
                </InputAdornment>
            )
            }}
        />

        <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <EmailIcon />
                </InputAdornment>
            )
            }}
        />

        <TextField
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <IconButton
                    onClick={handleTogglePassword}
                    edge="start"
                    size="small"
                >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
                </InputAdornment>
            )
            }}
        />

        <TextField
            label="N° de Contato (WhatsApp)"
            value={number}
            onChange={handleNumberChange}
            error={!!numberError}
            helperText={numberError}
            fullWidth
            margin="normal"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <WhatsAppIcon />
                </InputAdornment>
            )
            }}
        />

        <Button variant='contained' onClick={handleRegister}>
            Registrar
        </Button>
        <Button variant='text' onClick={() => navigate('/')}>
            Voltar para Login
        </Button>
        </div>
    </div>
    );
}

export default Register;
