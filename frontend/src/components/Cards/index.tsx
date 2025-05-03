import styles from './styles.module.css';
import { CardMedia, CardContent, Typography, Card, Button } from '@mui/material';
import { PokemonCard } from '../../types/Card';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Dialog from '../Dialog';

function Cards({ cardData }: { cardData: PokemonCard }) {
  const { name, number, set, images, tcgplayer } = cardData;

  const [dialogOpen, setDialogOpen] = useState(false);

  const marketPrice =
    tcgplayer?.prices?.normal?.market ??
    tcgplayer?.prices?.reverseHolofoil?.market ??
    tcgplayer?.prices?.holofoil?.market;

  const title = `${name} (${number}/${set.printedTotal})`;
  const text = marketPrice
    ? `$${marketPrice.toFixed(2)}`
    : "Valor indisponível.";

  return (
    <div className="container">
      <Card sx={{ maxWidth: 200, minHeight: 380 }}>
        <CardMedia component="img" image={images?.small} alt={title} />
        <CardContent className={styles.cardContainer}>
          <Typography gutterBottom variant="button" component="div">
            {title}
          </Typography>
          <Typography variant="body2" className={styles.priceTag}>
            {text}
          </Typography>
          <Button variant="outlined" onClick={() => setDialogOpen(true)}>
            <AddIcon />
          </Button>
        </CardContent>
      </Card>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        name={title}
        image={images?.large || images?.small}
        price={text}
      />

    </div>
  );
}

export default Cards;
