/**
 * Hook para gerenciar valores no localStorage com tipagem.
 * Permite armazenar e recuperar dados do localStorage mantendo a sincronização com o estado React.
 *
 * @param key - Chave usada para armazenar o valor no localStorage
 * @param initialValue - Valor inicial caso não exista um valor para a chave no localStorage
 * @returns [storedValue, setValue] - Um par similar ao useState com o valor armazenado e uma função para atualizá-lo
 *
 * @example
 * ```tsx
 * // Usar o hook em um componente
 * const [user, setUser] = useLocalStorage<User>('user', { name: '', email: '' });
 * 
 * // Atualizar o valor
 * setUser({ name: 'João', email: 'joao@example.com' });
 * 
 * // O valor será persistido no localStorage
 * ```
 */
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Estado para armazenar o valor
  // Inicializa o estado para ler do localStorage ou usar o valor inicial
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Obtém do localStorage pelo key
      const item = window.localStorage.getItem(key);
      // Retorna o valor parseado ou o initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Se ocorrer erro, retorna o initialValue
      console.error(`Erro ao recuperar ${key} do localStorage:`, error);
      return initialValue;
    }
  });

  // Função para atualizar o valor no estado e localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permite o valor ser uma função, como no setState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Salva no estado
      setStoredValue(valueToStore);
      
      // Salva no localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erro ao salvar ${key} no localStorage:`, error);
    }
  };

  // Sincroniza o valor com o localStorage quando a key muda
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : initialValue);
    } catch (error) {
      console.error(`Erro ao atualizar ${key} do localStorage:`, error);
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  return [storedValue, setValue];
} 