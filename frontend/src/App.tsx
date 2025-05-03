import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import MainPage from './components/MainPage'
import PaymentPage from './components/PaymentPage'
// import Search from './components/Search';
// import Banner from './assets/pokemon-tcg-pocket-banner.png'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  )
}

export default App
