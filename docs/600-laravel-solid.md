# 600-laravel-solid

## Regra para Padrões de Desenvolvimento Laravel com Princípios SOLID

Esta regra fornece diretrizes para desenvolvimento de aplicações backend usando Laravel, com foco em boas práticas de programação e princípios SOLID. Utilize esta regra sempre que estiver desenvolvendo, avaliando ou refatorando código em projetos Laravel.

### Princípios SOLID em Laravel

#### S - Princípio da Responsabilidade Única (Single Responsibility Principle)
- Cada classe deve ter uma única responsabilidade
- Controllers devem ser enxutos, delegando lógica de negócios para Services
- Models devem conter apenas o que é relevante para o modelo de dados
- Crie Services e Repositories para separar responsabilidades

```php
// EVITE: Controller com múltiplas responsabilidades
public function store(Request $request)
{
    $validated = $request->validate([...]);
    
    // Lógica de negócios
    if ($validated['status'] == 'premium') {
        // Processamento premium...
    }
    
    // Mais lógica...
    
    $user = User::create($validated);
    
    // Envio de email
    Mail::to($user)->send(new WelcomeEmail($user));
    
    return redirect()->route('users.show', $user->id);
}

// RECOMENDADO: Controller enxuto com injeção de dependências
public function store(Request $request, UserService $userService)
{
    $validated = $request->validate([...]);
    $user = $userService->createUser($validated);
    
    return redirect()->route('users.show', $user->id);
}
```

#### O - Princípio Aberto-Fechado (Open-Closed Principle)
- Classes devem estar abertas para extensão, mas fechadas para modificação
- Use traits, interfaces e classes abstratas
- Utilize padrões como Strategy e Observer

```php
// EVITE: Modificar classes existentes para adicionar funcionalidades
class ReportGenerator
{
    public function generatePdf()
    {
        // Lógica para PDF
    }
    
    public function generateCsv()
    {
        // Lógica para CSV
    }
    
    // Adicionar novo formato requer modificar esta classe
}

// RECOMENDADO: Interface e implementações específicas
interface ReportGeneratorInterface
{
    public function generate();
}

class PdfReportGenerator implements ReportGeneratorInterface
{
    public function generate()
    {
        // Lógica para PDF
    }
}

class CsvReportGenerator implements ReportGeneratorInterface
{
    public function generate()
    {
        // Lógica para CSV
    }
}
```

#### L - Princípio da Substituição de Liskov (Liskov Substitution Principle)
- Subtipo deve ser substituível por seu tipo base sem alterar o comportamento
- Use interfaces e classes abstratas corretamente
- Evite herança quando composição for mais apropriada

```php
// EVITE: Violar LSP
class Bird
{
    public function fly()
    {
        // Lógica de voo
    }
}

// Problema: nem todos pássaros voam
class Penguin extends Bird
{
    public function fly()
    {
        throw new Exception("Pinguins não podem voar!");
    }
}

// RECOMENDADO: Interfaces específicas
interface BirdInterface
{
    public function move();
}

interface FlyingBirdInterface extends BirdInterface
{
    public function fly();
}

class Penguin implements BirdInterface
{
    public function move()
    {
        // Lógica de movimento para pinguim
    }
}

class Eagle implements FlyingBirdInterface
{
    public function move()
    {
        // Lógica básica de movimento
    }
    
    public function fly()
    {
        // Lógica de voo
    }
}
```

#### I - Princípio da Segregação de Interfaces (Interface Segregation Principle)
- Crie interfaces específicas em vez de uma interface genérica
- Clientes não devem depender de interfaces que não utilizam
- Use Laravel Contracts para definir interfaces

```php
// EVITE: Interface grande com muitos métodos
interface UserRepositoryInterface
{
    public function find($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
    public function sendWelcomeEmail(User $user);
    public function verifyEmail(User $user);
    public function resetPassword(User $user);
}

// RECOMENDADO: Interfaces segregadas
interface UserRepositoryInterface
{
    public function find($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}

interface UserNotificationInterface
{
    public function sendWelcomeEmail(User $user);
    public function verifyEmail(User $user);
}

interface UserAuthenticationInterface
{
    public function resetPassword(User $user);
}
```

#### D - Princípio da Inversão de Dependência (Dependency Inversion Principle)
- Dependa de abstrações, não de implementações concretas
- Use injeção de dependência
- Aproveite o Service Container do Laravel

```php
// EVITE: Dependência direta de implementações
class UserController
{
    public function index()
    {
        $repository = new EloquentUserRepository();
        return view('users.index', ['users' => $repository->all()]);
    }
}

// RECOMENDADO: Injeção de dependência via interface
class UserController
{
    private $userRepository;
    
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    
    public function index()
    {
        return view('users.index', ['users' => $this->userRepository->all()]);
    }
}

// No ServiceProvider:
$this->app->bind(UserRepositoryInterface::class, EloquentUserRepository::class);
```

### Estrutura de Projeto Laravel Recomendada

```
app/
├── Console/             # Comandos Artisan
├── Exceptions/          # Tratamento de exceções
├── Http/
│   ├── Controllers/     # Controllers enxutos
│   ├── Middleware/      # Middleware personalizado
│   ├── Requests/        # Form Requests para validação
│   └── Resources/       # API Resources para transformação
├── Models/              # Eloquent Models
├── Providers/           # Service Providers
├── Services/            # Classes de serviço para lógica de negócios
├── Repositories/        # Padrão Repository para acesso a dados
├── Contracts/           # Interfaces (contratos)
└── Support/             # Classes auxiliares
```

### Boas Práticas em Laravel

1. **Controllers**
   - Mantenha controllers enxutos, usando Resource Controllers quando possível
   - Use Form Requests para validação
   - Delegue lógica de negócios para Services

2. **Models**
   - Use Eloquent corretamente, definindo relacionamentos
   - Implemente scopes para consultas reutilizáveis
   - Utilize traits para funcionalidades compartilhadas
   - Defina factories e seeders para testes

3. **Migrations e Database**
   - Crie migrations para todas as alterações de banco
   - Evite consultas SQL diretas, prefira Eloquent ou Query Builder
   - Use o padrão Repository para abstrair o acesso a dados

4. **Services**
   - Implemente a lógica de negócios em services
   - Siga SRP (Single Responsibility Principle)
   - Use injeção de dependência

5. **DRY (Don't Repeat Yourself)**
   - Crie traits, helpers e mixins para código reutilizável
   - Use macros para estender funcionalidades do framework

6. **Validação**
   - Use Form Requests para validação complexa
   - Centralize regras de validação comuns

7. **Tratamento de Exceções**
   - Crie exceções personalizadas quando necessário
   - Utilize o ExceptionHandler para tratar exceções globalmente

8. **Testes**
   - Escreva testes unitários, de integração e feature
   - Use factories e seeders para dados de teste
   - Implemente TDD quando possível

9. **API**
   - Use API Resources para transformação de dados
   - Implemente versionamento de API
   - Utilize Rate Limiting e autenticação adequada
   - Documente sua API (OpenAPI/Swagger)

10. **Performance**
    - Utilize cache quando apropriado
    - Evite N+1 queries com eager loading
    - Use filas (queues) para processamento em background
    - Implemente Horizon para monitoramento de filas

11. **Segurança**
    - Proteja contra CSRF, XSS e SQL Injection
    - Use políticas para autorização
    - Implemente autenticação segura (OAuth2, JWT)
    - Valide todos os dados de entrada

### Ferramentas Recomendadas

- **Laravel Telescope** para debugging e monitoramento
- **Laravel Horizon** para gerenciamento de filas
- **Laravel Sanctum/Passport** para autenticação API
- **PHP CS Fixer** para padronização de código
- **PHPStan/Psalm** para análise estática
- **Laravel Pint** para formatação de código

### Referências

- [Documentação Oficial do Laravel](https://laravel.com/docs)
- [Laravel Best Practices](https://github.com/alexeymezenin/laravel-best-practices)
- [SOLID Principles in PHP](https://laracasts.com/series/solid-principles-in-php) 