# Floussi

A personal finance tracking API built with Express, TypeScript, Prisma, and MariaDB/MySQL.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MariaDB](https://mariadb.org/) or MySQL database

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd floussi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file at the project root:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your-jwt-secret"
```

Replace the values with your actual database credentials and a secure JWT secret.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run database migrations

```bash
npx prisma migrate deploy
```

### 6. Start the development server

```bash
npm run dev
```

## Available Scripts

| Script          | Command         | Description                        |
| --------------- | --------------- | ---------------------------------- |
| `npm run dev`   | `ts-node-dev`   | Start dev server with hot reload   |
| `npm run build` | `tsc`           | Compile TypeScript to `dist/`      |
| `npm start`     | `node dist/...` | Run the compiled production server |
