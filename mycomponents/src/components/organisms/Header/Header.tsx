/**
 * Componente Header com menu de navegação para toda a aplicação
 * 
 * @component
 * @example
 * ```tsx
 * <Header />
 * ```
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import './Header.css';

export interface HeaderProps {
  /** Se o usuário está autenticado */
  isAuthenticated?: boolean;
  /** Função para fazer logout */
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAuthenticated = false,
  onLogout = () => {}
}) => {
  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__logo">
          <Link to="/">MyComponents</Link>
        </div>
        
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/" className="header__nav-link">Home</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/components" className="header__nav-link">Componentes</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/docs" className="header__nav-link">Documentação</Link>
            </li>
          </ul>
        </nav>
        
        <div className="header__actions">
          {isAuthenticated ? (
            <Button variant="outline" onClick={onLogout}>
              Sair
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/cadastro">
                <Button>Cadastrar</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}; 