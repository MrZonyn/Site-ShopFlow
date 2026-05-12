# ShopFlow — E-commerce Fullstack

> Plataforma de e-commerce completa com React, TypeScript, Node.js e MongoDB.

## Links

- **Frontend:** https://shopflow-front-six.vercel.app
- **Backend:** https://shopflow-api-0s9n.onrender.com

---

## Tecnologias

### Frontend

- React 19 + TypeScript 6
- Vite 8
- Tailwind CSS v4
- React Router v7
- Axios
- Framer Motion
- Context API (Cart + Auth + Toast)

### Backend

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT (autenticação)
- bcryptjs (hash de senha)

---

## Funcionalidades

- [x] Listagem de produtos com busca e filtros
- [x] Filtro por categoria, preço e ordenação
- [x] Página de produto com galeria de imagens
- [x] Carrinho com persistência no localStorage
- [x] Autenticação completa (login/cadastro com JWT)
- [x] Checkout com autopreenchimento de CEP via ViaCEP
- [x] Painel administrativo (CRUD de produtos)
- [x] Rotas protegidas por autenticação e role
- [x] Skeleton loading e transições de página
- [x] Design responsivo mobile-first
- [x] Toast notifications
- [x] Deploy completo (Vercel + Render)

---

## Estrutura do Projeto

```
src/
├── assets/
├── components/
│   ├── ui/          # Button, Badge, Spinner, Skeleton, Toast
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── HeroBanner.tsx
│   ├── CategoryGrid.tsx
│   ├── PageTransition.tsx
│   ├── PrivateRoute.tsx
│   └── AdminRoute.tsx
├── context/         # CartContext, AuthContext, ToastContext
├── hooks/           # useProducts, useProduct, useCategories, useCepLookup
├── pages/           # Home, Products, Product, Cart, Checkout, Login, Register, Admin
├── services/        # api.ts, productService.ts, adminService.ts
├── types/           # index.ts
└── utils/           # formatters.ts
```

---

## Quer testar?

### Pré-requisitos

- Node.js 18+
- Conta no MongoDB Atlas

### Frontend

```bash
git clone https://github.com/mrzonyn/shopflow.git
cd shopflow
npm install
cp .env.example .env    # configure VITE_API_URL
npm run dev
```

### Backend

```bash
git clone https://github.com/mrzonyn/shopflow-api.git
cd shopflow-api
npm install
cp .env.example .env    # configure MONGODB_URI e JWT_SECRET
npm run dev
```

### Variáveis de ambiente

**Frontend (`.env`)**

```env
VITE_API_URL=http://localhost:3333/api
```

**Backend (`.env`)**

```env
PORT=3333
MONGODB_URI=sua_connection_string
JWT_SECRET=sua_chave_secreta
NODE_ENV=development
```

---

## Autor

Feito por Guilherme P Cardozo

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/gui-cardozo)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/MrZonyn)
