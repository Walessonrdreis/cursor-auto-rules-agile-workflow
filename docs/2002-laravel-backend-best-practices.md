---
description: USE ao desenvolver aplicações Backend com Laravel para garantir boas práticas, arquitetura limpa e princípios SOLID
globs: app/**/*.php
---

# Laravel Backend Best Practices

<version>1.0.0</version>

## Contexto
- Aplicar ao desenvolver APIs RESTful, sistemas backend ou full-stack com Laravel
- Garantir código manutenível, testável e escalável seguindo princípios SOLID
- Implementar arquitetura em camadas para separar responsabilidades

## Requisitos

### Princípios SOLID
- Implemente o Princípio da Responsabilidade Única (SRP)
  - Controladores apenas coordenam o fluxo entre requisição e resposta
  - Serviços gerenciam a lógica de negócio
  - Classes têm um único motivo para mudar
- Aplique o Princípio Aberto-Fechado (OCP)
  - Utilize interfaces e contratos para permitir extensões
  - Implemente o padrão Strategy para comportamentos variáveis
  - Use eventos e listeners para desacoplar funcionalidades
- Siga o Princípio da Substituição de Liskov (LSP)
  - Garanta que subclasses são substituíveis por suas classes base
  - Mantenha contratos de interface consistentes em implementações
- Implemente o Princípio da Segregação de Interface (ISP)
  - Divida interfaces grandes em menores e mais específicas
  - Classes só implementam métodos que realmente usam
- Utilize o Princípio da Inversão de Dependência (DIP)
  - Dependa de abstrações, não de implementações concretas
  - Use injeção de dependência via construtor

### Arquitetura e Estrutura
- Organize o código em camadas de responsabilidade:
  - Camada de Apresentação (Controllers, Resources)
  - Camada de Aplicação (Services, DTOs)
  - Camada de Domínio (Models, Value Objects, Domain Events)
  - Camada de Infraestrutura (Repositories, External Services)
- Implemente o Repository Pattern para abstrair acesso a dados
- Use Service Layer para encapsular regras de negócio
- Crie DTOs para transferência de dados entre camadas
- Para projetos maiores, considere Domain-Driven Design (DDD)

### Padrões e Práticas
- Use Form Requests para validação de entrada
- Implemente API Resources para transformação de saída
- Crie Value Objects para conceitos imutáveis do domínio
- Utilize Exceptions específicas para domínio
- Implemente Jobs e Queues para processamento assíncrono
- Use Cache de forma estratégica e controlada
- Otimize consultas com eager loading e paginação
- Implemente testes em todos os níveis: unitários, integração e feature

### Convenções de Nomenclatura
- Siga os padrões PSR e convenções Laravel
- Use singular para Models e Controllers
- Use plural para tabelas e rotas
- Use camelCase para métodos
- Use snake_case para colunas de banco

## Exemplos

<example>
// Princípio da Responsabilidade Única (SRP)

// UserController.php - apenas coordena o fluxo
public function store(StoreUserRequest $request, UserService $userService)
{
    $user = $userService->createUser($request->validated());
    return redirect()->route('users.show', $user);
}

// UserService.php - contém lógica de negócio
public function createUser(array $data)
{
    // Lógica de negócio para criar usuário
    $user = User::create($data);
    event(new UserCreated($user));
    return $user;
}
</example>

<example>
// Princípio da Inversão de Dependência (DIP)

// Interface de repositório
interface UserRepositoryInterface
{
    public function findById(int $id): ?User;
    public function save(User $user): User;
}

// Implementação com Eloquent
class EloquentUserRepository implements UserRepositoryInterface
{
    public function findById(int $id): ?User
    {
        return User::find($id);
    }
    
    public function save(User $user): User
    {
        $user->save();
        return $user;
    }
}

// Controller depende da abstração
class UserController extends Controller
{
    protected $userRepository;
    
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }
}
</example>

<example>
// Service Layer com injeção de dependências

class OrderService
{
    protected $orderRepository;
    protected $paymentGateway;
    
    public function __construct(
        OrderRepositoryInterface $orderRepository,
        PaymentGatewayInterface $paymentGateway
    ) {
        $this->orderRepository = $orderRepository;
        $this->paymentGateway = $paymentGateway;
    }
    
    public function processOrder(array $orderData, User $user): Order
    {
        $order = new Order($orderData);
        $order->setUser($user);
        
        $paymentResult = $this->paymentGateway->processPayment([
            'amount' => $order->total,
            'user_id' => $user->id
        ]);
        
        if ($paymentResult->isSuccessful()) {
            $order->markAsPaid();
            $this->orderRepository->save($order);
            event(new OrderCreated($order));
            return $order;
        }
        
        throw new PaymentFailedException($paymentResult->getErrorMessage());
    }
}
</example>

<example type="invalid">
// Violação do SRP - Controller com lógica de negócio

public function store(Request $request)
{
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:8|confirmed',
    ]);
    
    $user = new User();
    $user->name = $validatedData['name'];
    $user->email = $validatedData['email'];
    $user->password = Hash::make($validatedData['password']);
    $user->save();
    
    // Enviar email diretamente do controller
    Mail::to($user->email)->send(new WelcomeEmail($user));
    
    // Criar perfil diretamente no controller
    $profile = new Profile();
    $profile->user_id = $user->id;
    $profile->save();
    
    return redirect()->route('users.show', $user);
}
</example>

<example type="invalid">
// Violação do DIP - Dependência direta de implementação concreta

class UserController extends Controller
{
    public function show($id)
    {
        // Dependência direta da implementação em vez de interface
        $user = User::find($id);
        
        if (!$user) {
            return abort(404);
        }
        
        return view('users.show', compact('user'));
    }
}
</example>

<example type="invalid">
// Consulta N+1 ineficiente

// Controller
public function index()
{
    $posts = Post::all(); // Carrega todos os posts
    
    return view('posts.index', compact('posts'));
}

// View - gera problema N+1
@foreach ($posts as $post)
    <h2>{{ $post->title }}</h2>
    <p>Author: {{ $post->user->name }}</p> // Consulta adicional para cada post
@endforeach
</example> 