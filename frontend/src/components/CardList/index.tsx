import React, { useState, useEffect } from 'react';
import { Carta } from '../../types/Card';
import { fetchCartas } from '../../services/api';
import Search from '../Search';
import Cards from '../Cards';
import styles from './styles.module.css';
import { Button, CircularProgress, Typography } from '@mui/material';

const CardList: React.FC = () => {
  const [cards, setCards] = useState<Carta[]>([]);
  const [filteredCards, setFilteredCards] = useState<Carta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const all = await fetchCartas();
        setCards(all);
        setFilteredCards(all);
      } catch (err) {
        console.error('Erro ao buscar cartas:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const filtered = cards.filter(card =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
    setCurrentPage(1);
  }, [searchTerm, cards]);

  const itemsPerPage = 8;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredCards.slice(indexOfFirst, indexOfLast);

  const handleNextPage = () => {
    if (indexOfLast < filteredCards.length) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <>
      <Search onSearchChange={value => setSearchTerm(value)} />

      {loading ? (
        <div className={styles.progress}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {currentItems.length === 0 ? (
            <Typography variant="h6">Nenhuma carta encontrada.</Typography>
          ) : (
            <div className={styles['cards-grid']}>
              {currentItems.map(card => (
                <Cards key={card.id} cardData={card} />
              ))}
            </div>
          )}

          <div className={styles['pagination-controls']}>
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              variant="outlined"
            >
              Anterior
            </Button>

            <Typography variant="button" component="div">
              Página {currentPage}
            </Typography>

            <Button
              onClick={handleNextPage}
              disabled={indexOfLast >= filteredCards.length}
              variant="outlined"
            >
              Próxima
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default CardList;