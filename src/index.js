import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/main.css';
import i18n from './i18n'; // i18n import edilmeli
import { CartProvider } from './context/CartContext';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter import edildi

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </I18nextProvider>
  </React.StrictMode>
);
