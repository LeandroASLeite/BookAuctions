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

A documentação completa dos endpoints da API pode ser acessada através do Swagger UI. através do link:
[http://localhost:8080/api#](http://localhost:8080/api#)
