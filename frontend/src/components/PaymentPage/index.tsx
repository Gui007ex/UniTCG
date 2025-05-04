import styles from './styles.module.css';
import AppBar from '../AppBar'
import Toolbar from '@mui/material/Toolbar';
import Footer from '../Footer';
import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import RadioGroup from '../RadioGroup';

function PaymentPage() {
    return (
        <>
        <div className={styles.app}>
            <div>
                <AppBar/>
                <Toolbar/>
            </div>
            <div className={styles.appInfo}>
                <Typography variant='h4'>Confirme sua compra </Typography>
                <div className={styles.container}>
                    <div className={styles.containerDiv1}>
                        <Typography variant='h5'>Forma de pagamento</Typography>
                        <div>
                            <RadioGroup/>
                        </div>
                    </div>
                    <Divider orientation="vertical" flexItem />
                    <div className={styles.containerDiv2}>
                        <Typography variant='h5'>Resumo</Typography>
                        <div className={styles.containerInfo}>
                            <div className={styles.title}>
                                {/* trocar aqui pela img da carta (provavelmente tirar Box e substituir por img)*/}
                                <Box
                                    sx={{
                                        width: 60,
                                        height: 90,
                                        borderRadius: 1,
                                        bgcolor: 'primary.main',
                                        '&:hover': {
                                        bgcolor: 'primary.dark',
                                        },
                                    }}
                                />
                                <Typography variant='h6'>Título</Typography> 
                            </div>
                            <Divider flexItem />
                            <div className={styles.avatar}>
                                <Avatar/>
                                <Typography variant="body1" gutterBottom>Nome de usuário</Typography>  {/* trocar aqui pelo nome de usuário*/}
                            </div>
                            <Divider flexItem />
                            <div className={styles.price}>
                                <Typography variant='h6'><strong>Total a pagar</strong></Typography>
                                <Typography variant='h6'>Preço</Typography> {/* trocar aqui pelo valor da carta */}
                            </div>
                            <Button variant='contained'>
                                Confirmar pagamento
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </>
    );
}

export default PaymentPage;