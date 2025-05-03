import styles from './styles.module.css';
import AppBar from '../AppBar'
import Toolbar from '@mui/material/Toolbar';
import CardList from '../CardList';
import Footer from '../Footer';

function MainPage() {
    return (
        <>
        <div className={styles.app}>
            <div>
                <AppBar/>
                <Toolbar/>
                <div className={styles.banner}></div>
            </div>
            <div className={styles.container}>
                <CardList />
            </div>
            <Footer/>
        </div>
    </>
    );
}

export default MainPage;