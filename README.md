# 🦸‍♂️ HeroesApp

Um sistema simples de **CRUD de Heróis** com gerenciamento de **Superpoderes**, feito para o desafio técnico de **.NET 8 (C#)** no backend e **Angular 18 + PrimeNG** no frontend para a Viceri Seidor.

---

## 🚀 Tecnologias Utilizadas

### 🔹 Backend
- **.NET 8 / ASP.NET Core Web API**
- **Entity Framework Core + SQLite**
- **Arquitetura em camadas (Domain, Application, Infrastructure)**
- **DTOs, Services, Controllers**
- **Validações com DataAnnotations**

### 🔹 Frontend
- **Angular 18**
- **PrimeNG** (UI Components: Table, Dialog, Button, DatePicker, etc.)
- **TailwindCSS** (estilização moderna e responsiva)
- **Reactive Forms** para validação
- **CRUD completo (Listar, Criar, Editar, Deletar)**

---

## ⚙️ Como Rodar o Projeto

### 🔹 1. Clonar o repositório
```bash
git clone https://github.com/mvsayegh/desafio-viceri-seidor.git
```

---

### 🔹 2. Rodando o Backend (.NET API)

1. Acesse a pasta:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   dotnet restore
   ```

3. Configure o banco de dados (SQLite) e aplique as migrations:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

4. Rode a API:
   ```bash
   dotnet run
   ```

➡️ A API estará disponível em: `https://localhost:44304/`  

---

### 🔹 3. Rodando o Frontend (Angular)

1. Acesse a pasta:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Rode a aplicação:
   ```bash
   ng serve
   ```

➡️ O frontend estará disponível em: `http://localhost:4200/`

---

## 📂 Estrutura do Projeto

```
heroes-app/
│
├── backend/                # Projeto .NET 8 Web API
│   ├── Domain/             # Entidades
│   ├── Application/        # DTOs e Interfaces
│   ├── Infrastructure/     # Data (DbContext, Repositories)
│   ├── API/                # Controllers da API
│   └── Program.cs
│
├── frontend/               # Projeto Angular 18
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/       # Interceptors, Models e Services.
│   │   │   ├── pages/      # Página de gerenciameto de heróis.
│   │   │   └── layout/     # Componentes relacionado ao layout responsivo.
│   └── angular.json
│
└── README.md
```

---

## 📌 Funcionalidades

✅ Listar heróis  
✅ Criar novo herói  
✅ Editar herói existente  
✅ Deletar herói  
✅ Associar heróis a superpoderes  
✅ Validações de idade, altura e peso  
✅ Interface moderna com **PrimeNG + Tailwind**

---

## 👨‍💻 Autor

Feito por **Marcus Vinícius** 🚀  
🔗 [GitHub](https://github.com/mvsayegh/)  
