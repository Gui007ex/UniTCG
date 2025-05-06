import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import MainPage from './components/MainPage'
import PaymentPage from './components/PaymentPage'
import Profile from './components/Profile'
import AddProduct from './components/AddProduct'
import Register from './components/Register'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/lucra" element={<AddProduct/>} />
      </Routes>
    </Router>
  )
}

export default App
