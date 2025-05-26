import React, { useState } from 'react';
import { Carta } from '../../types/Card';
import { Card as MUICard, CardMedia, CardContent, Typography, Button } from '@mui/material';
import styles from './styles.module.css';
import CustomizedDialog from '../Dialog';
import AddIcon from '@mui/icons-material/Add';

interface CardsProps {
  cardData: Carta;
}

const Cards: React.FC<CardsProps> = ({ cardData }) => {
  const { id, name, code, description, imgUrl, price, dealer, locked} = cardData;
  const title = `${name} (${code})`;
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className={`${styles.cardWrapper} ${locked ? styles.locked : ''}`}>
      <MUICard className={styles.card}>
        <CardMedia
          component="img"
          image={imgUrl}
          alt={name}
          className={styles.media}
        />
        <CardContent className={styles.cardContainer}>
          <Typography gutterBottom variant="button" component="div" className={styles.title}>
            {title}
          </Typography>
          <Typography variant="body2" className={styles.priceTag}>
            R$ {typeof price === 'number' ? price : price}
          </Typography>
          <Button variant="outlined" onClick={() => {if (!locked) setDialogOpen(true);}} disabled={locked}>
            <AddIcon />
          </Button>
        </CardContent>

        <CustomizedDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          id={id}
          code={code}
          name={name}
          imgUrl={imgUrl}
          price={typeof price === 'number' ? price : parseFloat(price)}
          description={description}
          dealerName={dealer.name}
          dealerNumber={dealer.number}
        />
      </MUICard>
    </div>
  );
};

export default Cards;