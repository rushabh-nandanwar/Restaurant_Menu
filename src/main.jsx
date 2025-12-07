import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from './Pages/Checkout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <header/>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
      <footer />
    </Router>
  </StrictMode>,
)
