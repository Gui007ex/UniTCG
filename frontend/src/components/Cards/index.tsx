// frontend/src/components/Cards/index.tsx
import React, { useState } from 'react'
import { Carta } from '../../types/Card'
import { CardMedia, CardContent, Typography, Card, Button } from '@mui/material'
import styles from './styles.module.css'
import Dialog from '../Dialog'
import AddIcon from '@mui/icons-material/Add'

interface CardsProps {
  cardData: Carta
}

const Cards: React.FC<CardsProps> = ({ cardData }) => {
  const { id, name, code, description, imgUrl, price, dealer } = cardData
  const title = `${name} (${code})`
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleOpen = () => setDialogOpen(true)
  const handleClose = () => setDialogOpen(false)

  return (
    <div className="container">
      <Card className={styles.card} sx={{ maxWidth: 200, minHeight: 300 }}>
        <CardMedia component="img" image={imgUrl} alt={name} />
        <CardContent className={styles.cardContainer}>
          <Typography gutterBottom variant="button" component="div">
            {title}
          </Typography>
          <Typography variant="body2" className={styles.priceTag}>
            {price}
          </Typography>
          <Button variant="outlined" onClick={handleOpen}>
            <AddIcon />
          </Button>
        </CardContent>

        <Dialog
          open={dialogOpen}
          onClose={handleClose}

          /** ← AQUI: adiciona o id para o Dialog poder navegar */
          id={id}

          /** props existentes */
          name={title}
          image={imgUrl}
          price={price}
          description={description}
          dealerName={dealer.name}
        />
      </Card>
    </div>
  )
}

export default Cards
