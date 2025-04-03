/**
 * Página de cadastro de usuários
 * 
 * @component
 * @example
 * ```tsx
 * <RegisterPage onRegister={handleRegister} />
 * ```
 */
import React, { useState } from 'react';
import { MainLayout } from '@/components/templates/MainLayout';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export interface RegisterPageProps {
  /** Função chamada quando o cadastro é bem-sucedido */
  onRegister?: (user: { name: string; email: string }) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onRegister = () => {}
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpa o erro quando o usuário começa a digitar
    if (errors[name as keyof RegisterFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: RegisterFormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
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
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não conferem';
    }
    
    if (!acceptTerms) {
      newErrors.general = 'Você deve aceitar os termos e condições para continuar';
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
      // Simulação de uma requisição de cadastro
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simula sucesso no cadastro
      // Na vida real, aqui você chamaria sua API
      onRegister({ 
        name: formData.name,
        email: formData.email
      });
      navigate('/login?registered=true');
    } catch (error) {
      setErrors({
        general: 'Falha no cadastro. Por favor, tente novamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="register-page">
        <div className="auth-container">
          <div className="auth-form-container">
            <h1 className="auth-title">Criar Conta</h1>
            <p className="auth-subtitle">Preencha os dados abaixo para criar sua conta</p>
            
            {errors.general && (
              <div className="auth-error">
                {errors.general}
              </div>
            )}
            
            <form className="auth-form" onSubmit={handleSubmit}>
              <FormField
                id="name"
                name="name"
                label="Nome completo"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome completo"
                error={errors.name}
                autoComplete="name"
                required
              />
              
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
                placeholder="Escolha uma senha forte"
                error={errors.password}
                autoComplete="new-password"
                required
              />
              
              <FormField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirmar senha"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Digite a senha novamente"
                error={errors.confirmPassword}
                autoComplete="new-password"
                required
              />
              
              <div className="auth-form__terms">
                <label className="auth-form__checkbox-label">
                  <input 
                    type="checkbox" 
                    className="auth-form__checkbox" 
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <span>Eu concordo com os <Link to="/termos" className="auth-form__link">Termos de Serviço</Link> e <Link to="/privacidade" className="auth-form__link">Política de Privacidade</Link></span>
                </label>
              </div>
              
              <Button 
                type="submit" 
                fullWidth 
                isLoading={isSubmitting}
                disabled={isSubmitting || !acceptTerms}
              >
                Cadastrar
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
                Já tem uma conta? <Link to="/login" className="auth-form__link">Fazer login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}; 