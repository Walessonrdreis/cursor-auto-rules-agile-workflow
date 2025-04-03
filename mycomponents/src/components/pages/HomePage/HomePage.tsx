/**
 * Página inicial da aplicação
 * 
 * @component
 * @example
 * ```tsx
 * <HomePage />
 * ```
 */
import React from 'react';
import { MainLayout } from '@/components/templates/MainLayout';
import { Button } from '@/components/atoms/Button';
import { Link } from 'react-router-dom';
import './HomePage.css';

export const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="home-page">
        <section className="hero">
          <div className="container">
            <div className="hero__content">
              <h1 className="hero__title">Biblioteca de Componentes React</h1>
              <p className="hero__description">
                Uma coleção de componentes React bem projetados, reutilizáveis e acessíveis 
                seguindo as melhores práticas de desenvolvimento.
              </p>
              <div className="hero__actions">
                <Link to="/components">
                  <Button size="lg">Ver Componentes</Button>
                </Link>
                <Link to="/docs">
                  <Button variant="outline" size="lg">Documentação</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="features">
          <div className="container">
            <h2 className="section-title">Recursos</h2>
            
            <div className="features__grid">
              <div className="feature-card">
                <div className="feature-card__icon">🎨</div>
                <h3 className="feature-card__title">Design System</h3>
                <p className="feature-card__description">
                  Componentes estilizados com sistema de design consistente e customizável.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-card__icon">🔍</div>
                <h3 className="feature-card__title">Acessibilidade</h3>
                <p className="feature-card__description">
                  Todos os componentes seguem as diretrizes WCAG para garantir acessibilidade.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-card__icon">⚡</div>
                <h3 className="feature-card__title">Performance</h3>
                <p className="feature-card__description">
                  Otimizado para performance com técnicas modernas de renderização.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-card__icon">📱</div>
                <h3 className="feature-card__title">Responsivo</h3>
                <p className="feature-card__description">
                  Adapta-se perfeitamente a diferentes tamanhos de tela e dispositivos.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="cta">
          <div className="container">
            <div className="cta__content">
              <h2 className="cta__title">Comece a usar hoje</h2>
              <p className="cta__description">
                Crie uma conta gratuita e comece a utilizar nossa biblioteca de componentes.
              </p>
              <Link to="/cadastro">
                <Button size="lg">Criar Conta</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}; 