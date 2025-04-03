/**
 * Layout principal da aplicação que inclui Header e Footer.
 * 
 * @component
 * @example
 * ```tsx
 * <MainLayout>
 *   <p>Conteúdo da página</p>
 * </MainLayout>
 * ```
 */
import React from 'react';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import './MainLayout.css';

export interface MainLayoutProps {
  /** Conteúdo a ser renderizado dentro do layout */
  children: React.ReactNode;
  /** Se o usuário está autenticado */
  isAuthenticated?: boolean;
  /** Função para realizar logout */
  onLogout?: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  isAuthenticated = false,
  onLogout = () => {}
}) => {
  return (
    <div className="main-layout">
      <Header isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <main className="main-layout__content">
        {children}
      </main>
      <Footer />
    </div>
  );
}; 