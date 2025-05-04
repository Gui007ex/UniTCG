import React, { useState } from 'react';
import styles from './styles.module.css';
import AppBar from '../AppBar';
import Toolbar from '@mui/material/Toolbar';
import Footer from '../Footer';
import {Box, Button, TextField, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const [nome, setNome] = useState('');
    const [codigo, setCodigo] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagemFile, setImagemFile] = useState<File | null>(null);

    const navigate = useNavigate();

    const handlePublicar = async () => {
    const stored = localStorage.getItem('user');
    if (!stored) {
        alert('Você precisa estar logado para anunciar');
        return;
    }
    const user = JSON.parse(stored) as { id: string };

    const formData = new FormData();
    formData.append('name', nome);
    formData.append('code', codigo);
    formData.append('price', preco);
    formData.append('description', descricao);
    if (imagemFile) {
        formData.append('image', imagemFile);
    }

    try {
        const url = `http://3.148.180.16:8080/api/carta/usuario/${user.id}`;
        console.log('POST multipart to', url, formData);

        const res = await fetch(url, {
        method: 'POST',
        body: formData
        });

        console.log('Status:', res.status);
        const text = await res.text();
        console.log('Resposta:', text);

        if (!res.ok) {
        throw new Error(`Erro ${res.status}`);
        }

        navigate('/main');
    } catch (err) {
        console.error('Falha ao publicar:', err);
        alert(`Falha ao publicar: ${(err as Error).message}`);
    }
    };

    return (
    <div className={styles.app}>
        <div>
        <AppBar />
        <Toolbar />
        </div>
        <div className={styles.appInfo}>
        <Typography variant="h4">Adicionar Produto</Typography>
        <div className={styles.container}>
            <div className={styles.containerImg}>
            <Box
                sx={{
                width: 200,
                height: 200,
                borderRadius: 1,
                bgcolor: imagemFile ? 'transparent' : 'primary.main',
                backgroundImage: imagemFile
                    ? `url(${URL.createObjectURL(imagemFile)})`
                    : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}
            />
            <Button
                variant="outlined"
                fullWidth
                component="label"
                sx={{ mt: 1 }}
            >
                Upload de Imagem
                <input
                type="file"
                accept="image/*"
                hidden
                onChange={e => {
                    if (e.target.files?.[0]) {
                    setImagemFile(e.target.files[0]);
                    }
                }}
                />
            </Button>
            </div>
            <div className={styles.containerInfo}>
            <Typography variant="h5">Informações sobre o produto</Typography>
            <TextField
                fullWidth
                required
                label="Nome da Carta"
                value={nome}
                onChange={e => setNome(e.target.value)}
            />
            <div className={styles.form}>
                <TextField
                fullWidth
                required
                label="Código da Carta (NNN/NNN)"
                value={codigo}
                onChange={e => setCodigo(e.target.value)}
                />
                <TextField
                fullWidth
                required
                label="Preço"
                type="number"
                value={preco}
                onChange={e => setPreco(e.target.value)}
                />
            </div>
            <TextField
                fullWidth
                required
                label="Descrição"
                multiline
                rows={4}
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                sx={{ mt: 1 }}
            />
            </div>
        </div>
        <div className={styles.btn}>
            <Button variant="outlined" onClick={() => navigate('/main')}>
            Cancelar
            </Button>
            <Button variant="contained" onClick={handlePublicar}>
            Publicar
            </Button>
        </div>
        </div>
        <Footer />
    </div>
    );
}

export default AddProduct;
