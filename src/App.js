// src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Komponen dan Halaman
import Landing from './components/Landing.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Dashboard from './pages/Dashboard.js';
import Transaksi from './pages/Transaksi.js';
import Riwayat from './pages/Riwayat.js'; // <-- 1. IMPORT KOMPONEN RIWAYAT

function App() {
  return React.createElement(
    AppProvider,
    null,
    React.createElement(BrowserRouter, null,
      React.createElement(Routes, null,
        React.createElement(Route, { path: '/', element: React.createElement(Landing) }),
        React.createElement(Route, { path: '/login', element: React.createElement(Login) }),
        React.createElement(Route, { path: '/register', element: React.createElement(Register) }),
        React.createElement(Route, { path: '/dashboard', element: React.createElement(Dashboard) }),
        React.createElement(Route, { path: '/transaksi', element: React.createElement(Transaksi) }),
        React.createElement(Route, { path: '/riwayat', element: React.createElement(Riwayat) }) // <-- 2. TAMBAHKAN ROUTE INI
      )
    )
  )
}

export default App;