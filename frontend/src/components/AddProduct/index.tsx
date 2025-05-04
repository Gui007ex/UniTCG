import styles from './styles.module.css';
import AppBar from '../AppBar'
import Toolbar from '@mui/material/Toolbar';
import Footer from '../Footer';
import { Box, Button, TextField, Typography } from '@mui/material';

function AddProduct() {
    return (
        <>
        <div className={styles.app}>
            <div>
                <AppBar/>
                <Toolbar/>
            </div>
            <div className={styles.appInfo}>
                <Typography variant='h4'>Adicionar Produto</Typography>
                <div className={styles.container}>
                    {/* img, nome, descrição, preço e código da carta */}
                    <div className={styles.containerImg}>
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
                        <Button fullWidth variant='outlined'>Upload de Imagem</Button>
                    </div>
                    <div  className={styles.containerInfo}>
                        <Typography variant='h5'>Informações sobre o produto</Typography>
                        <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            label="Nome da Carta"
                        />
                        <div className={styles.form}>
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Código da Carta (NNN/NNN)"
                            />
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Preço"
                            />
                        </div>
                        <TextField
                            fullWidth
                            required
                            id="outlined-multiline-static"
                            label="Descrição"
                            multiline
                            rows={4}
                        />
                    </div>
                </div>
                <div className={styles.btn}>
                    <Button variant='outlined'>Cancelar</Button>
                    <Button variant='contained'>Publicar</Button>
                </div>
            </div>
            <Footer/>
        </div>
    </>
    );
}

export default AddProduct;