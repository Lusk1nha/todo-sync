# Task Management Application

## 🇺🇸 English

This is a **Task Management Application** designed to streamline the organization and handling of tasks. The application uses a modern tech stack, combining a React-based frontend with a Rust backend for high performance and scalability.

### Motivation

The primary reason for building this application was twofold:

1. **Personal Task Management**: I needed a solution to manage my personal tasks efficiently. This application serves as a tool for organizing and keeping track of my day-to-day responsibilities.
  
2. **Learning Experience**: I used this project as an opportunity to deepen my knowledge of **Rust** and to experience managing a more complex application architecture. This project allowed me to learn about backend development with Rust, along with frontend integration using React, expanding my understanding of full-stack application development.

### Technologies Used

#### Frontend (React)

The frontend is built with **React** and leverages the following libraries and frameworks:

- **React Router DOM** - For routing and navigation.
- **Jotai** - For state management.
- **Tailwind CSS** - Utility-first CSS framework for styling.
- **Shadcn UI** - For UI components and design system.
- **Framer Motion** - For animations.
- **Tanstack Query** - Data fetching and caching.
- **Vitest** - Unit testing framework.
- **React Testing Library** - Testing utilities for React components.
- **React Hook Form** - Form handling.
- **Zod** - Schema validation.
- **Axios** - HTTP client for making requests.

#### Backend (Rust)

The backend is powered by **Rust**, ensuring performance and safety. Key libraries include:

- **Axum** - HTTP server framework for building web applications.
- **Tokio** - Asynchronous runtime for handling non-blocking I/O.
- **SQLx** - For database interactions with **Postgres**.
- **Serde** - For JSON serialization and deserialization.

#### Database (Postgres)

The application uses **Postgres** as the database. It handles:

- **Users**: Managing user data.
- **Tasks (CRUD)**: Full CRUD operations for task management.
- **Authentication**: User authentication and session management.

### Architecture

Key architectural decisions include:

- **Authentication**: Secure user authentication flow.
- **Token (JWT)**: JSON Web Token for session management.
- **Real-Time Tasks**: Real-time task updates and synchronization.

### Future Plans

The application is continuously evolving. Upcoming features include:

- **WhatsApp Integration**: Allow task updates via WhatsApp messages.
- **Socket.io Implementation**: Real-time communication with WebSocket support.

---

## 🇧🇷 Português

Este é um **Aplicativo de Gerenciamento de Tarefas** projetado para otimizar a organização e o gerenciamento de tarefas. O aplicativo utiliza uma pilha tecnológica moderna, combinando um frontend baseado em React com um backend em Rust, garantindo alto desempenho e escalabilidade.

### Motivo

O principal motivo para construir este aplicativo foi duplo:

1. **Gerenciamento de Tarefas Pessoais**: Eu precisava de uma solução para gerenciar minhas tarefas pessoais de maneira eficiente. Este aplicativo serve como uma ferramenta para organizar e acompanhar minhas responsabilidades diárias.

2. **Experiência de Aprendizado**: Aproveitei este projeto como uma oportunidade para aprofundar meu conhecimento em **Rust** e para aprender a gerenciar uma arquitetura de aplicativo mais complexa. Este projeto me permitiu aprender sobre desenvolvimento backend com Rust, além de integrar o frontend com React, expandindo meu entendimento sobre desenvolvimento full-stack.

### Tecnologias Utilizadas

#### Frontend (React)

O frontend é construído com **React** e utiliza as seguintes bibliotecas e frameworks:

- **React Router DOM** - Para roteamento e navegação.
- **Jotai** - Para gerenciamento de estado.
- **Tailwind CSS** - Framework de CSS utilitário para estilização.
- **Shadcn UI** - Para componentes de interface e sistema de design.
- **Framer Motion** - Para animações.
- **Tanstack Query** - Para busca e cache de dados.
- **Vitest** - Framework de testes unitários.
- **React Testing Library** - Ferramentas de teste para componentes React.
- **React Hook Form** - Manipulação de formulários.
- **Zod** - Validação de esquemas.
- **Axios** - Cliente HTTP para fazer requisições.

#### Backend (Rust)

O backend é desenvolvido com **Rust**, garantindo desempenho e segurança. As principais bibliotecas utilizadas incluem:

- **Axum** - Framework HTTP para construir aplicações web.
- **Tokio** - Runtime assíncrono para lidar com I/O não bloqueante.
- **SQLx** - Para interações com o banco de dados **Postgres**.
- **Serde** - Para serialização e desserialização de JSON.

#### Banco de Dados (Postgres)

O aplicativo utiliza **Postgres** como banco de dados. Ele lida com:

- **Usuários**: Gerenciamento de dados de usuários.
- **Tarefas (CRUD)**: Operações completas de CRUD para o gerenciamento de tarefas.
- **Autenticação**: Autenticação de usuários e gerenciamento de sessões.

### Arquitetura

As principais decisões arquitetônicas incluem:

- **Autenticação**: Fluxo seguro de autenticação de usuários.
- **Token (JWT)**: Token JWT para gerenciamento de sessões.
- **Tarefas em Tempo Real**: Atualizações e sincronização de tarefas em tempo real.

### Planos Futuros

O aplicativo está em constante evolução. Próximos recursos incluem:

- **Integração com WhatsApp**: Permitir atualizações de tarefas via mensagens do WhatsApp.
- **Implementação do Socket.io**: Comunicação em tempo real com suporte a WebSocket.
