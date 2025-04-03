/**
 * Componente Footer para o layout principal da aplicação
 * 
 * @component
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export interface FooterProps {
  /** Ano atual para copyright */
  year?: number;
}

export const Footer: React.FC<FooterProps> = ({
  year = new Date().getFullYear()
}) => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__grid">
          <div className="footer__column">
            <h3 className="footer__title">MyComponents</h3>
            <p className="footer__description">
              Biblioteca de componentes React seguindo as melhores práticas de desenvolvimento.
            </p>
          </div>
          
          <div className="footer__column">
            <h4 className="footer__subtitle">Links</h4>
            <nav className="footer__nav">
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <Link to="/" className="footer__nav-link">Home</Link>
                </li>
                <li className="footer__nav-item">
                  <Link to="/components" className="footer__nav-link">Componentes</Link>
                </li>
                <li className="footer__nav-item">
                  <Link to="/docs" className="footer__nav-link">Documentação</Link>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="footer__column">
            <h4 className="footer__subtitle">Conta</h4>
            <nav className="footer__nav">
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <Link to="/login" className="footer__nav-link">Login</Link>
                </li>
                <li className="footer__nav-item">
                  <Link to="/cadastro" className="footer__nav-link">Cadastro</Link>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="footer__column">
            <h4 className="footer__subtitle">Contato</h4>
            <address className="footer__address">
              <a href="mailto:contato@mycomponents.com" className="footer__link">
                contato@mycomponents.com
              </a>
              <p>São Paulo, Brasil</p>
            </address>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {year} MyComponents. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}; 