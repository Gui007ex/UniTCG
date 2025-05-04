import React from 'react';
import { Carta } from '../../types/Card';
import { CardMedia, CardContent, Typography, Card, Button } from '@mui/material';
import styles from './styles.module.css';
import Dialog from '../Dialog';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

interface CardsProps {
  cardData: Carta;
}

const Cards: React.FC<CardsProps> = ({ cardData }) => {
  const { name, code, description, imgUrl, price, dealer } = cardData;

  const title = `${name} (${code})`;

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="container"> 
      <Card className={styles.card} sx = {{maxWidth:200, minHeight:300}}>
        <CardMedia component="img" image={imgUrl} alt={name}/>
        <CardContent className={styles.cardContainer}>
          <Typography gutterBottom variant="button" component="div">
            {title}
          </Typography>
          <Typography variant="body2" className={styles.priceTag}>
            {price}
          </Typography>
        <Button variant="outlined" onClick={() => setDialogOpen(true)}>
              <AddIcon />
        </Button>
        </CardContent>

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          name={title}
          image={imgUrl}
          price={price}
          description={description}
          dealerName={dealer.name}        
          />
      </Card>
    </div>
  );
};

export default Cards;
