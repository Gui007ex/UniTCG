import styles from './styles.module.css';
import PersonIcon from '@mui/icons-material/Person';
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
import axios from 'axios'; // <--- Biblioteca para requisições

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_LOGIN_URL || 'http://localhost:8080/auth/login';
      const response = await axios.post(BACKEND_URL, {
        usernameOrEmail,
        password,
      });

      localStorage.setItem('user', JSON.stringify(response.data));
      
      console.log('Usuário logado:', response.data);
      navigate('/main');
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Credenciais inválidas');
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.app}>
      <div className={styles.center}>
        <AccountCircleIcon fontSize='large' className={styles.title} />
        <Typography variant='h4' className={styles.title}>
          Entrar
        </Typography>

        <TextField
          label="Nome de Usuário ou Email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
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

        <Button variant='contained' onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
