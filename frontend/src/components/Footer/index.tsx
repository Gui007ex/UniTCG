import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PlayingCards from '../../assets/playing_cards.svg';
import styles from './styles.module.css';

const Footer = () => {
    return (
    <Box
        component="footer"
        sx={{
        backgroundColor: '#000',
        color: '#fff',
        py: 4,
        mt: 'auto',
        width: '100%',
        }}
    >
        <Container maxWidth="xl" className={styles.container}>
            <div className={styles.containerItem}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={PlayingCards} alt="Logo" style={{ height: 40, marginRight: 10 }} />
                    <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed' }}>
                    UniTCG
                    </Typography>
                </Box>
            </div>
            <div>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Membros da Equipe
                </Typography>
                <Typography variant="body2">Louise Portela</Typography>
                <Typography variant="body2">Vinícius Lima</Typography>
                <Typography variant="body2">Guilherme Leocádio</Typography>
                <Typography variant="body2">José Giovanni</Typography>
            </div>
            <div>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Turma
                </Typography>
                <Typography variant="body2">Computação Distribuída</Typography>
                <Typography variant="body2">NAB24</Typography>

            </div>
        </Container>
    </Box>
    );
};

export default Footer;
