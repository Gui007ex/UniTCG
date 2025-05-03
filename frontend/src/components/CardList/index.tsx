import { useEffect, useState } from 'react';
import Cards from '../Cards';
import { PokemonCard } from '../../types/Card';
import styles from './styles.module.css';
import { Button, CircularProgress, Typography } from '@mui/material';
import Search from '../Search';

function CardList() {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const pageSize = 50;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = searchTerm
          ? `?q=name:${encodeURIComponent(searchTerm)}&page=${currentPage}&pageSize=${pageSize}`
          : `?page=${currentPage}&pageSize=${pageSize}`;
        const response = await fetch(`https://api.pokemontcg.io/v2/cards${query}`);
        const data = await response.json();
        setCards(data.data);
      } catch (error) {
        console.error('Erro ao buscar cartas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchTerm]);

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
}

export default CardList;
