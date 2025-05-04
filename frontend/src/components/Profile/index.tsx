import styles from './styles.module.css';
import AppBar from '../AppBar'
import Toolbar from '@mui/material/Toolbar';
import Footer from '../Footer';
import { Avatar, Box, Button, Divider, Typography } from '@mui/material';

function Profile() {
    return (
        <>
        <div className={styles.app}>
            <div>
                <AppBar/>
                <Toolbar/>
            </div>
            <div className={styles.container}>
                <div className={styles.containerProfile}>
                    <Avatar sx={{ width: 80, height: 80 }}/>
                    <Typography variant='h5'>Usuário</Typography>
                    <Typography variant='body1'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia illum temporibus eius perspiciatis, excepturi qui voluptate rerum repellendus optio itaque voluptatem corporis magni hic? Adipisci autem iure suscipit. Mollitia, excepturi?</Typography>
                    <Divider variant='middle' flexItem/>
                    <Button variant='contained'>Editar perfil</Button>
                </div>
                <div className={styles.containerInfo}>
                    <Typography variant='h5' gutterBottom>Anúncios</Typography>
                    <div className={styles.display}>
                    {/* colocar produtos anunciados pela pessoa */}
                        <Box
                            sx={{
                            width: 200,
                            height: 200,
                            borderRadius: 1,
                            bgcolor: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            },
                            }}
                        />
                        <Box
                            sx={{
                            width: 200,
                            height: 200,
                            borderRadius: 1,
                            bgcolor: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            },
                            }}
                        />
                        <Box
                            sx={{
                            width: 200,
                            height: 200,
                            borderRadius: 1,
                            bgcolor: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            },
                            }}
                        />
                        <Box
                            sx={{
                            width: 200,
                            height: 200,
                            borderRadius: 1,
                            bgcolor: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            },
                            }}
                        />
                        <Box
                            sx={{
                            width: 200,
                            height: 200,
                            borderRadius: 1,
                            bgcolor: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            },
                            }}
                        />
                        <Box
                            sx={{
                            width: 200,
                            height: 200,
                            borderRadius: 1,
                            bgcolor: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            },
                            }}
                        />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </>
    );
}

export default Profile;