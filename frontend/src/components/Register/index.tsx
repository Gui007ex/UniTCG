import styles from './styles.module.css';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
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

    const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
    };

    const handleRegister = async () => {
    try {
        await axios.post('http://3.148.180.16:8080/api/usuario', {
        name: username,
        email,
        password,
        });

        alert('Conta criada com sucesso!');
        navigate('/');
    } catch (error: any) {
        console.error('Erro ao criar conta:', error);
        alert('Erro ao criar conta. Verifique os dados informados.');
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
