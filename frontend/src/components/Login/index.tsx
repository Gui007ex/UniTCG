// import './App.css'
import styles from './styles.module.css'
import PersonIcon from '@mui/icons-material/Person';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate(); // <- Hook para navegação

    const handleLogin = () => {
        // Aqui você poderia adicionar validação/autenticação se quiser
        navigate('/main'); // Redireciona para MainPage
    }
    return (
        <>
            <div className={styles.app}>
                <div className={styles.center}>
                    <AccountCircleIcon fontSize='large' className={styles.title}/>
                    <Typography variant='h4' className={styles.title}>
                        Entrar
                    </Typography>
                    <TextField label="Nome de Usuário"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}/>
                    <TextField label="Senha"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VisibilityIcon />
                            </InputAdornment>
                        ),
                    }}/>
                    <Button variant='contained' onClick={handleLogin}>
                        Login
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Login
