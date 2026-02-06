import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/CartContext';

// Initialize Animate On Scroll
AOS.init({
  duration: 800,
  easing: 'ease-out',
  once: true,
  offset: 100,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
