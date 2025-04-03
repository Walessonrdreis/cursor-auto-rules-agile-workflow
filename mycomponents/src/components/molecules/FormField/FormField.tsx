/**
 * Componente FormField que agrupa label, input e mensagem de erro para formulários.
 * 
 * @component
 * @example
 * ```tsx
 * <FormField
 *   id="email"
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onChange={handleChange}
 *   error={errors.email}
 * />
 * ```
 */
import React from 'react';
import './FormField.css';

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** ID do campo, usado para associar label e input */
  id: string;
  /** Texto do label */
  label: string;
  /** Mensagem de erro para exibir */
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  error,
  className = '',
  ...rest
}) => {
  return (
    <div className={`form-field ${error ? 'form-field--error' : ''} ${className}`}>
      <label htmlFor={id} className="form-field__label">
        {label}
      </label>
      <input
        id={id}
        className="form-field__input"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="form-field__error-message">
          {error}
        </p>
      )}
    </div>
  );
}; 