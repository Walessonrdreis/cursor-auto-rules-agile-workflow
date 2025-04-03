# MyComponents

Projeto React seguindo as melhores práticas de arquitetura, documentação e organização de código.

## Estrutura do Projeto

O projeto segue uma estrutura organizacional baseada em domínios de negócio e no padrão Atomic Design para componentes:

```
src/
├── assets/        # Recursos estáticos (imagens, ícones, etc.)
├── components/    # Componentes reutilizáveis
│   ├── atoms/     # Componentes básicos indivisíveis
│   ├── molecules/ # Compostos de átomos
│   ├── organisms/ # Componentes complexos
│   ├── templates/ # Layouts para páginas
│   └── pages/     # Componentes de página
├── context/       # Contextos React
├── features/      # Módulos de funcionalidades
├── hooks/         # Custom hooks
├── services/      # Serviços e chamadas de API
├── styles/        # Estilos globais
├── types/         # Definições de tipos globais
└── utils/         # Funções utilitárias
```

## Tecnologias Utilizadas

- React
- TypeScript
- CSS (com variáveis CSS para design system)

## Boas Práticas Implementadas

1. **TypeScript** para tipagem estática
2. **Atomic Design** para componentização
3. **Documentação JSDoc** para todos os componentes e funções
4. **Hooks personalizados** para lógica reutilizável
5. **Barrel files** para exportações organizadas
6. **Design System** com variáveis CSS
7. **Responsabilidade única** para componentes e funções

## Executando o Projeto

```bash
# Instalar dependências
npm install

# Iniciar o ambiente de desenvolvimento
npm start

# Executar testes
npm test

# Gerar build de produção
npm run build
```

## Documentação de Componentes

Cada componente possui:
- Documentação JSDoc
- Tipagem completa com TypeScript
- Exemplos de uso
- Responsabilidade claramente definida

## Padrões de Código

- Nomes de componentes em **PascalCase**
- Nomes de funções e variáveis em **camelCase**
- Arquivos de componentes com extensão **.tsx**
- Arquivos de estilos com extensão **.css**

## Créditos

Desenvolvido como um projeto de exemplo para demonstrar as melhores práticas em desenvolvimento React.
