/**
 * Arquivo principal de tipos global para o projeto.
 * Contém interfaces e tipos reutilizáveis em todo o projeto.
 */

/**
 * Interface base para componentes que contêm children
 */
export interface BaseProps {
  /** Conteúdo filho a ser renderizado dentro do componente */
  children?: React.ReactNode;
  /** Classe CSS adicional opcional para o componente */
  className?: string;
}

/**
 * Interface para componentes que possuem habilidade de foco
 */
export interface FocusableProps {
  /** Se o componente deve receber focus auto ao montagem */
  autoFocus?: boolean;
  /** Se o componente está desabilitado */
  disabled?: boolean;
  /** Função chamada quando o componente recebe foco */
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  /** Função chamada quando o componente perde foco */
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
}

/**
 * Estados possíveis para requisições de API
 */
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Interface para estados de requisições de API
 */
export interface ApiState<T> {
  /** Dados retornados pela API */
  data: T | null;
  /** Status atual da requisição */
  status: RequestStatus;
  /** Mensagem de erro, se houver */
  error: string | null;
  /** Timestamp da última atualização */
  lastUpdated?: number;
} 