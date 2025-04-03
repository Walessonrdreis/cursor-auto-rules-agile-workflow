# Componentes

Este diretório contém os componentes React reutilizáveis seguindo a metodologia de Atomic Design.

## Estrutura

- `/atoms`: Componentes básicos indivisíveis (Button, Input, Text, Icon)
- `/molecules`: Componentes compostos de átomos (FormField, Card, SearchBar)
- `/organisms`: Componentes complexos compostos de moléculas (Navbar, Form, ProductList)
- `/templates`: Layouts que organizam organismos (DashboardLayout, AuthLayout)
- `/pages`: Componentes que representam páginas completas

## Guia de Desenvolvimento

1. Mantenha componentes pequenos e com responsabilidade única
2. Documente seus componentes com JSDoc
3. Use TypeScript para definir props de forma clara
4. Crie testes unitários para cada componente
5. Mantenha a consistência visual e de API entre componentes relacionados 