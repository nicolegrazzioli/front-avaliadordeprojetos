> preview README vs code: ctrl + k (solta) + v

# 📚 Sistema de Gestão de Biblioteca - Frontend

Este projeto é o Frontend desenvolvido em **Angular**, consumindo uma API REST em **Java Spring Boot**. O sistema gerencia o empréstimo de livros, controle de autores e usuários com autenticação segura.

---

## ⚠️ Configurações do Backend (API)

| Serviço | Porta | Configuração |
| :--- | :--- | :--- |
| **API Spring Boot** | `8081` | `server.port=8081` |
| **Banco de Dados** | `5433` | PostgreSQL |
| **Nome do Banco** | `POOW2` | Database Name |
| **Flyway** | `Enabled` | Migrations automáticas ativas |

---

## 📦 Instruções de Entrega e Requisitos

### 📋 Checklist de Entrega
- [x] **Branch:** O código está na branch chamada `segunda_entrega`.
- [ ] **Repositório:** A raiz do projeto Angular está na raiz do repositório (sem subpastas).
- [x] **Arquivos Ignorados:** Pastas `node_modules` e `dist` **não** foram enviadas.
- [ ] **Vídeo:** Link do vídeo (Max 5 min) demonstrando o código e a aplicação rodando.
- [ ] **Arquivo Final:** Arquivo `.txt` com os links (Repos + Vídeo).

### 🎥 Requisitos do Vídeo
O vídeo deve conter:
1.  Descrição do trabalho.
2.  Demonstração da aplicação rodando.
3.  Destaque dos trechos de código mais importantes.

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** [Angular](https://angular.io/) (v17+)
* **Linguagem:** TypeScript
* **UI Components:** Angular Material & Bootstrap 5
* **Autenticação:** JWT (JSON Web Token)
* **Roteamento:** Lazy Loading

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
Certifique-se de ter o **Node.js** e o **Angular CLI** instalados.

### Passos
1. **Clone o repositório e acesse a branch correta:**
   ```bash
   git clone front-avaliadordeprojetos
   git checkout segunda_entrega
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   ng serve
   ```

4. Acesse a aplicação: Abra o navegador em `http://localhost:4200`

---

## 🏆 Critérios de Avaliação 

1. Estrutura e Configuração (1,0 pt)
- [x] Organização em pastas (`core`, `modules`, `environment`).
- [x] Bootstrap e Angular Material configurados no `angular.json`.

2. Roteamento e Navegação (1,5 pt)
- [x] Implementação de Lazy Loading para módulos (Home, Login, etc).
- [x] Uso correto de `<router-outlet>`.

3. Integração com API (2,0 pts)
- [x] Services isolados (`AutorService`, `LivroService`, `EmprestimoService`).
- [x] Uso do `HttpClient` (GET, POST, PUT, DELETE).
- [x] URL da API centralizada no `environment.ts`.

4. Segurança e Autenticação (1,5 pt)
- [x] Login funcional com JWT.
- [x] HttpInterceptor implementado para anexar o Token automaticamente.
- [x] Guards protegendo rotas privadas (redirecionamento se não logado).

5. Formulários e Validação (2,0 pts)
- [x] Uso de `ReactiveFormsModule` (FormGroup, FormBuilder).
- [x] Validadores (`required`, `email`, etc).
- [x] Feedback visual com `<mat-error>`.

6. Interface de Usuário (2,0 pts)
- [x] Componentes Angular Material (Toolbar, Card, Table, Icon).
- [x] Layout responsivo com Grid System/Bootstrap.
- [x] CRUD completo visível na interface.