/**
 * Componente principal da aplicação com configuração de rotas
 * 
 * @component
 */
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/components/pages/HomePage';
import { LoginPage } from '@/components/pages/LoginPage';
import { RegisterPage } from '@/components/pages/RegisterPage';
import '@/styles/globals.css';
import './App.css';

const App: React.FC = () => {
  const [user, setUser] = useState<{ name?: string; email: string } | null>(null);

  const handleLogin = (userData: { email: string }) => {
    setUser(userData);
  };

  const handleRegister = (userData: { name: string; email: string }) => {
    // Apenas simula o registro bem-sucedido
    console.log('Usuário registrado:', userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/cadastro" element={<RegisterPage onRegister={handleRegister} />} />
      </Routes>
    </Router>
  );
};

export default App; 