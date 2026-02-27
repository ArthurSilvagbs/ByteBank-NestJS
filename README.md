# ByteBank-NestJS

## Descrição do Projeto

O ByteBank-NestJS é uma API RESTful desenvolvida com NestJS para simular um sistema bancário básico. Ele gerencia clientes, contas e transações, fornecendo funcionalidades essenciais para operações financeiras. A aplicação utiliza PostgreSQL como banco de dados e TypeORM para a persistência de dados, além de contar com Docker Compose para facilitar a configuração do ambiente de desenvolvimento.

## Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

*   **NestJS**: Um framework progressivo Node.js para a construção de aplicações server-side eficientes e escaláveis.
*   **TypeScript**: Linguagem de programação que adiciona tipagem estática ao JavaScript, melhorando a manutenibilidade e a detecção de erros.
*   **TypeORM**: Um ORM (Object Relational Mapper) que suporta os bancos de dados mais populares e ajuda a escrever aplicações robustas e escaláveis.
*   **PostgreSQL**: Um sistema de gerenciamento de banco de dados objeto-relacional poderoso, de código aberto e altamente extensível.
*   **Docker & Docker Compose**: Utilizados para orquestrar o ambiente de desenvolvimento, garantindo que o banco de dados PostgreSQL seja facilmente configurado e executado.
*   **Swagger (OpenAPI)**: Para documentação interativa da API, permitindo testar os endpoints diretamente do navegador.

## Arquitetura

A arquitetura do projeto segue os princípios do NestJS, organizando o código em módulos (`clientes`, `contas`, `transacoes`), controladores, serviços e entidades. Isso promove a modularidade, a separação de responsabilidades e a facilidade de manutenção.

### Módulos Principais:

*   **ClientesModule**: Gerencia as operações relacionadas aos clientes, como criação, consulta e atualização.
*   **ContasModule**: Responsável pela lógica de negócios das contas bancárias, incluindo criação, consulta, depósitos, saques e transferências.
*   **TransacoesModule**: Lida com o registro e a consulta de todas as transações realizadas no sistema.

## Funcionalidades

O ByteBank-NestJS oferece as seguintes funcionalidades:

*   **Gerenciamento de Clientes**: Cadastro, consulta e atualização de informações de clientes.
    *   `id`: UUID gerado automaticamente.
    *   `name`: Nome do cliente.
    *   `cpf`: CPF do cliente (único).
    *   `email`: Email do cliente.
    *   `phone`: Telefone do cliente.
    *   `address`: Endereço do cliente.
    *   `createdAt`, `updatedAt`: Timestamps de criação e atualização.
*   **Gerenciamento de Contas**: Criação de contas associadas a clientes, com controle de saldo e status.
    *   `id`: UUID gerado automaticamente.
    *   `accountNumber`: Número da conta (gerado automaticamente, único).
    *   `balance`: Saldo da conta (decimal, padrão 0).
    *   `status`: Status da conta (`unlocked` ou `blocked`).
    *   `cliente`: Relacionamento ManyToOne com Cliente.
    *   `entradas`, `saidas`: Relacionamentos OneToMany com Transacao.
    *   `createdAt`, `updatedAt`: Timestamps de criação e atualização.
*   **Realização de Transações**: Registro de depósitos, saques e transferências entre contas.
    *   `id`: UUID gerado automaticamente.
    *   `contaOrigem`: Conta de origem da transação.
    *   `contaDestino`: Conta de destino da transação (opcional para saques/depósitos).
    *   `valor`: Valor da transação (decimal).
    *   `dataHora`: Timestamp da transação.

## Configuração do Ambiente

Para configurar e rodar o projeto localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

### Passos para Configuração

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/ArthurSilvagbs/ByteBank-NestJS.git
    cd ByteBank-NestJS
    ```

2.  **Configure as variáveis de ambiente:**

    Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

    ```env
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5437
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    DB_DATABASE=postgres
    ```

    *Nota: O `DB_PORT` está configurado para `5437` no `docker-compose.yml` para evitar conflitos com uma instalação padrão do PostgreSQL na porta `5432`.*

3.  **Inicie o banco de dados com Docker Compose:**

    ```bash
    docker-compose up -d
    ```

    Este comando irá subir um container PostgreSQL e criar o banco de dados conforme configurado no `create-db.sql` e `docker-compose.yml`.

4.  **Instale as dependências do projeto:**

    ```bash
    npm install
    # ou yarn install
    ```

## Como Rodar o Projeto

Após configurar o ambiente, você pode iniciar a aplicação NestJS:

*   **Modo Desenvolvimento (com watch):**

    ```bash
    npm run start:dev
    ```

*   **Modo Produção:**

    ```bash
    npm run start:prod
    ```

O servidor estará disponível em `http://localhost:3000` (ou na porta especificada em seu `.env`).

## Endpoints da API (Swagger)

Para acessar a documentação interativa da API e testar os endpoints, navegue para:

`http://localhost:3000/docs`

## Estrutura do Projeto

A estrutura de diretórios do projeto é organizada da seguinte forma:

```
ByteBank-NestJS/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── clientes/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── clientes.controller.ts
│   │   ├── clientes.module.ts
│   │   └── clientes.service.ts
│   ├── contas/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── contas.controller.ts
│   │   ├── contas.module.ts
│   │   └── contas.service.ts
│   └── transacoes/
│       ├── dto/
│       ├── entities/
│       ├── transacoes.controller.ts
│       ├── transacoes.module.ts
│       └── transacoes.service.ts
├── test/
├── docker-compose.yml
├── create-db.sql
├── package.json
├── tsconfig.json
└── README.md
```

## Licença

Este projeto está licenciado sob a licença UNLICENSED.

---

*Gerado por Manus AI em 27 de fevereiro de 2026.*
