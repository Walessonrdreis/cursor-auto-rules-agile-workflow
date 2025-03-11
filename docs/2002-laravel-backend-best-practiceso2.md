# Padrões de Desenvolvimento Laravel Backend

## Descrição
Esta regra estabelece padrões de desenvolvimento para aplicações Backend usando Laravel, com ênfase nos princípios SOLID e boas práticas de programação. Siga estas diretrizes para criar código mais limpo, manutenível e testável.

## Princípios SOLID em Laravel

### S - Princípio da Responsabilidade Única (SRP)
- Cada classe deve ter uma única responsabilidade
- Controladores devem apenas gerenciar requisições HTTP e respostas
- Mova a lógica de negócios para Services
- Mova a lógica de acesso a dados para Repositories

**Exemplo:**
```php
// Controlador com Responsabilidade Única
class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function store(UserRequest $request)
    {
        $user = $this->userService->createUser($request->validated());
        return new UserResource($user);
    }
}
```

### O - Princípio Aberto/Fechado (OCP)
- Classes devem estar abertas para extensão, fechadas para modificação
- Use interfaces e classes abstratas para permitir extensões
- Implemente o pattern Strategy quando lógicas precisam variar

**Exemplo:**
```php
// Interface para diferentes estratégias de notificação
interface NotificationChannel
{
    public function send(User $user, string $message): bool;
}

class EmailNotification implements NotificationChannel 
{
    public function send(User $user, string $message): bool
    {
        // Lógica para enviar email
    }
}

class SmsNotification implements NotificationChannel
{
    public function send(User $user, string $message): bool
    {
        // Lógica para enviar SMS
    }
}
```

### L - Princípio da Substituição de Liskov (LSP)
- Subclasses devem ser substituíveis por suas classes base
- Garanta que as subclasses respeitem os contratos das interfaces
- Evite sobrescrever métodos com comportamentos diferentes

**Exemplo:**
```php
// Interface de Repository que define o contrato
interface UserRepositoryInterface
{
    public function findById(int $id): ?User;
    public function getAll(): Collection;
    public function create(array $data): User;
}

// Implementações que respeitam o contrato
class EloquentUserRepository implements UserRepositoryInterface
{
    public function findById(int $id): ?User
    {
        return User::find($id);
    }
    
    // Implementação dos outros métodos...
}

class CacheUserRepository implements UserRepositoryInterface
{
    // Implementação com cache...
}
```

### I - Princípio da Segregação de Interface (ISP)
- Interfaces devem ser específicas e focadas
- Evite interfaces "gordas" com muitos métodos
- Divida interfaces grandes em menores e mais específicas

**Exemplo:**
```php
// Ao invés de uma interface grande:
interface UserRepositoryInterface
{
    public function findById(int $id): ?User;
    public function getAll(): Collection;
    public function create(array $data): User;
    public function update(int $id, array $data): User;
    public function delete(int $id): bool;
}

// Melhor abordagem com interfaces específicas:
interface ReadableUserRepository
{
    public function findById(int $id): ?User;
    public function getAll(): Collection;
}

interface WritableUserRepository
{
    public function create(array $data): User;
    public function update(int $id, array $data): User;
    public function delete(int $id): bool;
}
```

### D - Princípio da Inversão de Dependência (DIP)
- Módulos de alto nível não devem depender de módulos de baixo nível
- Ambos devem depender de abstrações
- Utilize a injeção de dependência do Laravel

**Exemplo:**
```php
// Registre no ServiceProvider
public function register()
{
    $this->app->bind(
        UserRepositoryInterface::class,
        EloquentUserRepository::class
    );
}

// Use a injeção de dependência no construtor
class UserService
{
    protected $userRepository;
    
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    
    // Métodos do serviço...
}
```

## Estrutura de Diretórios Recomendada

```
app/
├── Console/               # Comandos personalizados
├── Exceptions/            # Tratamento de exceções
├── Http/
│   ├── Controllers/       # Controladores
│   ├── Middleware/        # Middlewares
│   ├── Requests/          # Form Requests para validação
│   └── Resources/         # API Resources
├── Models/                # Modelos Eloquent
├── Repositories/
│   ├── Contracts/         # Interfaces de repositórios
│   └── Eloquent/          # Implementações Eloquent
├── Services/              # Serviços com lógica de negócios
├── Providers/             # Service Providers
├── Domain/                # (Opcional) Para DDD
│   ├── User/              # Domínio específico
│   │   ├── Actions/       # Single Action Classes
│   │   ├── DataTransferObjects/ # DTOs
│   │   ├── Events/        # Domain events
│   │   └── ValueObjects/  # Value Objects
│   └── Product/           # Outro domínio
└── Support/               # Classes utilitárias
```

## Padrões Arquiteturais Recomendados

### 1. Repository Pattern
- Crie uma abstração entre modelos e a lógica de negócios
- Use interfaces para definir contratos
- Implemente classes de repositório que satisfaçam esses contratos

```php
// Contrato
interface ProductRepositoryInterface
{
    public function findById(int $id): ?Product;
    public function getByCategoryId(int $categoryId): Collection;
    // Outros métodos...
}

// Implementação
class EloquentProductRepository implements ProductRepositoryInterface
{
    public function findById(int $id): ?Product
    {
        return Product::find($id);
    }
    
    public function getByCategoryId(int $categoryId): Collection
    {
        return Product::where('category_id', $categoryId)->get();
    }
    
    // Implementação dos outros métodos...
}
```

### 2. Service Layer
- Encapsule a lógica de negócios em serviços
- Os serviços devem coordenar entre repositórios
- Implemente regras de negócio complexas nos serviços

```php
class OrderService
{
    protected $orderRepository;
    protected $productRepository;
    protected $paymentService;
    
    public function __construct(
        OrderRepositoryInterface $orderRepository,
        ProductRepositoryInterface $productRepository,
        PaymentServiceInterface $paymentService
    ) {
        $this->orderRepository = $orderRepository;
        $this->productRepository = $productRepository;
        $this->paymentService = $paymentService;
    }
    
    public function createOrder(array $data, User $user): Order
    {
        // Verificar estoque
        // Calcular total
        // Processar pagamento
        // Criar o pedido
        // Atualizar estoque
        // Enviar notificações
    }
}
```

### 3. Domain-Driven Design (para aplicações complexas)
Para aplicações com domínio de negócios complexo, considere adotar padrões DDD:

- **Value Objects**: Para encapsular conceitos do domínio
- **Entities**: Para objetos com identidade e ciclo de vida
- **Aggregates**: Para agrupar entidades relacionadas
- **Domain Events**: Para comunicar mudanças significativas no domínio
- **Services**: Para lógica que não pertence naturalmente a entidades ou value objects

```php
// Value Object
final class Money
{
    private float $amount;
    private string $currency;
    
    public function __construct(float $amount, string $currency)
    {
        $this->amount = $amount;
        $this->currency = $currency;
    }
    
    public function add(Money $money): Money
    {
        if ($this->currency !== $money->currency) {
            throw new InvalidArgumentException('Cannot add different currencies');
        }
        
        return new Money($this->amount + $money->amount, $this->currency);
    }
    
    // Outros métodos...
}
```

## Boas Práticas Gerais

### 1. Validação
- Use Form Requests para validação de dados
- Mantenha regras de validação fora dos controladores
- Crie validadores customizados para lógicas complexas

```php
class CreateUserRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
        ];
    }
}
```

### 2. Eloquent (ORM)
- Use Eloquent Relationships apropriadamente
- Defina escopos para consultas frequentes
- Use Eager Loading para evitar o problema N+1
- Considere Query Builders personalizados para consultas complexas

```php
// No modelo, defina relacionamentos e escopos
class Product extends Model
{
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
    
    public function scopeInStock($query)
    {
        return $query->where('stock', '>', 0);
    }
}

// No uso:
$availableProducts = Product::active()->inStock()->with('category')->get();
```

### 3. Tratamento de Erros
- Crie exceções personalizadas para diferentes cenários
- Use middleware para capturar e formatar exceções em APIs
- Registre erros apropriadamente para monitoramento

```php
// Exceção personalizada
class InsufficientStockException extends Exception
{
    protected $product;
    
    public function __construct(Product $product)
    {
        $this->product = $product;
        parent::__construct("Produto {$product->name} não tem estoque suficiente");
    }
    
    public function getProduct()
    {
        return $this->product;
    }
}

// No Handler.php
public function render($request, Throwable $exception)
{
    if ($exception instanceof InsufficientStockException) {
        return response()->json([
            'error' => 'insufficient_stock',
            'message' => $exception->getMessage(),
            'product_id' => $exception->getProduct()->id
        ], 422);
    }
    
    return parent::render($request, $exception);
}
```

### 4. Testes
- Escreva testes unitários para lógica de negócios
- Escreva testes de integração para APIs
- Use factories e seeders para preparar dados de teste
- Considere TDD (Test-Driven Development) para features complexas

```php
// Teste de feature para API
public function test_can_create_product()
{
    $this->actingAs($user = User::factory()->create());
    
    $response = $this->postJson('/api/products', [
        'name' => 'Product Test',
        'price' => 100,
        'description' => 'Test description',
    ]);
    
    $response->assertStatus(201)
        ->assertJsonStructure(['data' => ['id', 'name', 'price']]);
        
    $this->assertDatabaseHas('products', ['name' => 'Product Test']);
}
```

### 5. API Design
- Use Resources para transformar dados
- Implemente versionamento de API
- Use códigos HTTP apropriados
- Documente sua API usando ferramentas como Swagger/OpenAPI

```php
// API Resource para transformação consistente
class ProductResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => [
                'value' => $this->price,
                'formatted' => 'R$ ' . number_format($this->price, 2, ',', '.'),
            ],
            'category' => new CategoryResource($this->whenLoaded('category')),
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
```

## Lembre-se

- Mantenha o código limpo e legível
- Documentação clara e útil é essencial
- Siga o estilo de código PSR-12
- Refatore regularmente para evitar dívida técnica
- Use ferramentas como Laravel Pint e PHPStan para qualidade de código

## Referências
- [Laravel Best Practices](https://github.com/alexeymezenin/laravel-best-practices)
- [Laravel Documentation](https://laravel.com/docs)
- [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Domain-Driven Design](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) 