/**
 * Componente Button reutilizável com diferentes variantes e estados.
 * 
 * @component
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Clique aqui
 * </Button>
 * ```
 */
import React from 'react';
import type { BaseProps, FocusableProps } from '@/types';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends BaseProps, FocusableProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  /** Variante visual do botão */
  variant?: ButtonVariant;
  /** Tamanho do botão */
  size?: ButtonSize;
  /** Se o botão deve ocupar toda a largura disponível */
  fullWidth?: boolean;
  /** Se o botão está em estado de carregamento */
  isLoading?: boolean;
  /** Ícone para exibir antes do texto do botão */
  startIcon?: React.ReactNode;
  /** Ícone para exibir depois do texto do botão */
  endIcon?: React.ReactNode;
}

/**
 * Componente Button que pode ser usado em toda a aplicação
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  startIcon,
  endIcon,
  type = 'button',
  ...rest
}) => {
  // Composição das classes com base nas props
  const buttonClasses = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    fullWidth ? 'button--full-width' : '',
    isLoading ? 'button--loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <span className="button__spinner" />}
      {startIcon && !isLoading && <span className="button__icon button__icon--start">{startIcon}</span>}
      <span className="button__text">{children}</span>
      {endIcon && !isLoading && <span className="button__icon button__icon--end">{endIcon}</span>}
    </button>
  );
}; 