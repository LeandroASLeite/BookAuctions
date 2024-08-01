# Projeto de Leilão de Livros

Este projeto é uma aplicação web para leilão de livros, desenvolvida utilizando Next.js 14 para o front-end, Shadcn UI para o CSS, NestJS para o backend e PostgreSQL como banco de dados. O backend e o banco de dados são executados em contêineres Docker.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados em sua máquina:

- Docker

- Node.js (v14.x ou superior)

- Chocolatey (para Windows)

- Git

- Make

- PNPM

## Instalando os Pré-requisitos

#### Docker

Siga as instruções no site oficial do Docker para instalar o Docker em seu sistema operacional.

#### Node.js

Baixe e instale o Node.js a partir do site oficial.

#### Chocolatey (para Windows)

Instale o Chocolatey executando o comando abaixo no Prompt de Comando ou PowerShell:

`Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

`

#### Git

Baixe e instale o Git a partir do [site oficial](https://git-scm.com/).

#### Make

##### Ubuntu/Debian:

`sudo apt-get install build-essential`

##### MacOS:

Instale o Xcode Command Line Tools:

`xcode-select --install`

##### Windows:

Instale o GnuWin ou use o Chocolatey:

`choco install make`

#### PNPM

Instale o PNPM globalmente usando o npm:

`npm install -g pnpm`

## Instalação

Clone o repositório do projeto para a sua máquina local.

`cd BookAuctions`

`cd backend`

`make run-database`

`make run-api`

`cd ../frontend`

`pnpm install`

`pnpm dev`

## Endpoints

A documentação completa dos endpoints da API pode ser acessada através do Swagger UI (desde que a api esteja sendo executada). através do link:
[http://localhost:8080/api#](http://localhost:8080/api#)

## Endpoints

### 1. Create a Book

**POST /books**

Cria um Livro.

**Request Body:**
``json
{
"title": "O Senhor dos Anéis",

"author": "J.R.R. Tolkien",

"genre": "Fantasia",

"imageURL": "http://example.com/image.jpg"
}

**Example Request:**

`POST "http://localhost:8080/books" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"title\":\"O Senhor dos Anéis\",\"author\":\"J.R.R. Tolkien\",\"genre\":\"Fantasia\",\"imageURL\":\"http://example.com/image.jpg\"}"`

**Responses:**

- `201`: Livro criado com sucesso

### 2. Get Books by User ID

**GET /books**

Procura um Livro pelo `userId`.

**Parameters:**

- `userId` (query): O ID do usuário. Exemplo: `12345`

**Example Request:**

`GET "http://localhost:8080/books?userId=12345" -H "accept: application/json"`

**Responses:**

- `200`: Lista de livros do usuário

### 3. Edit a Book

**PATCH /books/{id}**

Edita um Livro.

**Parameters:**

- `id` (path): O ID do livro. Exemplo: `1`

**Request Body:**

`{
  "title": "O Senhor dos Anéis - Edição Revisada"
}`

**Example Request:**

`PATCH "http://localhost:8080/books/1" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"title\":\"O Senhor dos Anéis - Edição Revisada\"}"`

**Responses:**

- `200`: Livro editado com sucesso

### 4. Delete a Book

**DELETE /books/{id}**

Deleta um Livro.

**Parameters:**

- `id` (path): O ID do livro. Exemplo: `1`

**Example Request:**

`DELETE "http://localhost:8080/books/1" -H "accept: application/json"`

**Responses:**

- `204`: Livro deletado com sucesso

### 5. Get Book by ID

**GET /books/{id}**

Procura um Livro por ID.

**Parameters:**

- `id` (path): O ID do livro. Exemplo: `1`

**Example Request:**

`GET "http://localhost:8080/books/1" -H "accept: application/json"`

**Responses:**

- `200`: Detalhes do livro

### 6. Get Books and Bids by User ID

**GET /books/bids**

Procura um Livro e os Lances pelo `userId`.

**Parameters:**

- `userId` (query): O ID do usuário. Exemplo: `12345`

**Example Request:**

`GET "http://localhost:8080/books/bids?userId=12345" -H "accept: application/json"`

**Responses:**

- `200`: Lista de livros e lances do usuário

### 7. Create a Bid

**POST /bids**

Cria um Lance.

**Request Body:**

`{
  "bookId": "1",
  "price": 100.00
}`

**Example Request:**

`POST "http://localhost:8080/bids" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"bookId\":\"1\",\"price\":100.00}"`

**Responses:**

- `201`: Lance criado com sucesso

### 8. Get Bids by User ID or Book ID

**GET /bids**

Busca um lance por `userId` ou por `bookId`.

**Parameters:**

- `userId` (query): O ID do usuário. Exemplo: `12345`
- `bookId` (query): O ID do livro. Exemplo: `1`

**Example Request:**

`GET "http://localhost:8080/bids?userId=12345&bookId=1" -H "accept: application/json"`

**Responses:**

- `200`: Lista de lances

### 9. Delete a Bid

**DELETE /bids/{id}**

Deleta um Lance.

**Parameters:**

- `id` (path): O ID do lance. Exemplo: `1`

**Example Request:**

`DELETE "http://localhost:8080/bids/1" -H "accept: application/json"`

**Responses:**

- `204`: Lance deletado com sucesso

### 10. Accept a Bid

**POST /bids/accept/{id}**

Aceita um Lance e cancela os outros.

**Parameters:**

- `id` (path): O ID do lance. Exemplo: `1`

**Example Request:**

`POST "http://localhost:8080/bids/accept/1" -H "accept: application/json"`

**Responses:**

- `200`: Lance aceito e outros cancelados

### 11. Reject a Bid

**POST /bids/reject/{id}**

Rejeita um Lance.

**Parameters:**

- `id` (path): O ID do lance. Exemplo: `1`

**Example Request:**

`POST "http://localhost:8080/bids/reject/1" -H "accept: application/json"`

**Responses:**

- `200`: Lance rejeitado

### 12. Register a User

**POST /users**

Registra um Usuário.

**Request Body:**

`{
  "email": "usuario@example.com",
  "name": "Usuário",
  "password": "senha123"
}`

**Example Request:**

`curl -X POST "http://localhost:8080/users" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"email\":\"usuario@example.com\",\"name\":\"Usuário\",\"password\":\"senha123\"}"`

**Responses:**

- `201`: Usuário registrado com sucesso

### 13. Login

**POST /auth/login**

Realiza o Login.

**Request Body:**

`{
  "email": "usuario@example.com",
  "password": "senha123"
}`

**Example Request:**

`POST "http://localhost:8080/auth/login" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"email\":\"usuario@example.com\",\"password\":\"senha123\"}"`

**Responses:**

- `200`: Login realizado com sucesso
