import styles from './styles.module.css';
import AppBar from '../AppBar';
import Toolbar from '@mui/material/Toolbar';
import CardList from '../CardList';
import Footer from '../Footer';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/lucra');
  };

  return (
    <div className={styles.app}>
      <div>
        <AppBar />
        <Toolbar />
        <div className={styles.banner}></div>
      </div>
      <div className={styles.container}>
        <CardList />
      </div>
      <div className={styles.floatButton}>
        <Fab variant="extended" color="primary" onClick={handleNavigate}>
          <AddIcon sx={{ mr: 1 }} />
          Anunciar Produto
        </Fab>
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
