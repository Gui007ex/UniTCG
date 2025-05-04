import React, { useState, useEffect } from 'react';
import { Carta } from '../../types/Card';
import { fetchCartas } from '../../services/api';
import Search from '../Search';
import Cards from '../Cards';
import styles from './styles.module.css';
import { Button, CircularProgress, Typography } from '@mui/material';

const CardList: React.FC = () => {
  const [cards, setCards] = useState<Carta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredCards, setFilteredCards] = useState<Carta[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>(''); 

  // carrega as cartas do back
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const all = await fetchCartas();
        setCards(all);
        setFilteredCards(all);
      } catch (err) {
        console.error('Erro ao buscar cartas:', err);
      } finally{
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <Search onSearchChange={(value) => {
        setSearchTerm(value);
        setCurrentPage(1);
      }} />
      {loading ? (
        <div className={styles['progress']}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className={styles['cards-grid']}>
            {cards.map((card) => (
              <Cards key={card.id} cardData={card} />
            ))}
          </div>
          <div className={styles['pagination-controls']}>
            <Button onClick={handlePrevPage} disabled={currentPage === 1} variant="outlined">
              Anterior
            </Button>
            <Typography variant="button" component="div">
              Página {currentPage}
            </Typography>
            <Button onClick={handleNextPage} variant="outlined">
              Próxima
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default CardList;