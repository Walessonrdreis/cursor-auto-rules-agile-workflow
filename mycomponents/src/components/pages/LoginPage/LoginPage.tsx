/**
 * Página de login da aplicação
 * 
 * @component
 * @example
 * ```tsx
 * <LoginPage onLogin={handleLogin} />
 * ```
 */
import React, { useState } from 'react';
import { MainLayout } from '@/components/templates/MainLayout';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface LoginPageProps {
  /** Função chamada quando o login é bem-sucedido */
  onLogin?: (user: { email: string }) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin = () => {}
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpa o erro quando o usuário começa a digitar
    if (errors[name as keyof LoginFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulação de uma requisição de login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simula sucesso no login
      // Na vida real, aqui você chamaria sua API de autenticação
      onLogin({ email: formData.email });
      navigate('/');
    } catch (error) {
      setErrors({
        general: 'Falha na autenticação. Verifique seu email e senha.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="login-page">
        <div className="auth-container">
          <div className="auth-form-container">
            <h1 className="auth-title">Login</h1>
            <p className="auth-subtitle">Entre com suas credenciais para acessar sua conta</p>
            
            {errors.general && (
              <div className="auth-error">
                {errors.general}
              </div>
            )}
            
            <form className="auth-form" onSubmit={handleSubmit}>
              <FormField
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                error={errors.email}
                autoComplete="email"
                required
              />
              
              <FormField
                id="password"
                name="password"
                label="Senha"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Digite sua senha"
                error={errors.password}
                autoComplete="current-password"
                required
              />
              
              <div className="auth-form__remember">
                <label className="auth-form__checkbox-label">
                  <input type="checkbox" className="auth-form__checkbox" />
                  <span>Lembrar-me</span>
                </label>
                <Link to="/recuperar-senha" className="auth-form__link">
                  Esqueceu a senha?
                </Link>
              </div>
              
              <Button 
                type="submit" 
                fullWidth 
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Entrar
              </Button>
            </form>
            
            <div className="auth-separator">
              <span>ou continue com</span>
            </div>
            
            <div className="auth-social">
              <button className="auth-social__button">
                Google
              </button>
              <button className="auth-social__button">
                GitHub
              </button>
            </div>
            
            <div className="auth-footer">
              <p>
                Não tem uma conta? <Link to="/cadastro" className="auth-form__link">Cadastre-se</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}; 