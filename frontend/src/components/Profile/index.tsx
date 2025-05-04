import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import AppBar from '../AppBar';
import Toolbar from '@mui/material/Toolbar';
import Footer from '../Footer';
import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import { Usuario } from '../../types/Usuario';
import { Carta } from '../../types/Card';
import { fetchCartas } from '../../services/api';
import Cards from '../Cards';

const Profile: React.FC = () => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [myCards, setMyCards] = useState<Carta[]>([]);

  // 1) Carrega o usuário logado do localStorage
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // 2) Quando tivermos o user, busca e filtra as cartas dele
  useEffect(() => {
    if (!user) return;

    fetchCartas()
      .then(all => {
        const filtered = all.filter(c => c.dealer.id === user.id);
        setMyCards(filtered);
      })
      .catch(console.error);
  }, [user]);

  if (!user) {
    return (
      <div className={styles.app}>
        <AppBar />
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          Carregando perfil...
        </Typography>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppBar />
      <Toolbar />

      <div className={styles.container}>
        {/* Seção de Perfil */}
        <div className={styles.containerProfile}>
          <Avatar sx={{ width: 80, height: 80 }}>
            {user.name[0].toUpperCase()}
          </Avatar>
          <Typography variant="h5" sx={{ mt: 1 }}>
            {user.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {user.email}
          </Typography>
          <Divider variant="middle" flexItem sx={{ mb: 2 }} />
          <Button variant="contained">Editar perfil</Button>
        </div>

        {/* Seção de Anúncios */}
        <div className={styles.containerInfo}>
          <Typography variant="h5" gutterBottom>
            Meus Anúncios
          </Typography>
          <div className={styles.display}>
            {myCards.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                Você ainda não fez nenhum anúncio.
              </Typography>
            )}
            {myCards.map(card => (
              <Cards key={card.id} cardData={card} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
