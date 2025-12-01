# Shinigami REST API

REST API scraping manga Shinigami dengan Express.js + TypeScript.

## 🚀 Installation

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env

# 3. (Optional) Edit .env untuk ubah PORT
# PORT=3000
```

## 💻 Usage

```bash
# Development (dengan hot reload)
npm run dev

# Build untuk production
npm run build

# Run production
npm start

# Test API (pastikan server sudah running)
npm test
```

## 📚 API Documentation

**Buka file [`api.http`](api.http) untuk melihat semua endpoint dengan contoh request yang bisa langsung dicoba!**

Atau akses: `http://localhost:3000` setelah server running untuk melihat daftar endpoint.

### Quick Overview

| Endpoint                           | Keterangan     |
| ---------------------------------- | -------------- |
| `GET /api/health`                  | Health check   |
| `GET /api/manga/popular`           | Manga populer  |
| `GET /api/manga/latest`            | Update terbaru |
| `GET /api/manga/search?q=naruto`   | Cari manga     |
| `GET /api/manga/:id`               | Detail manga   |
| `GET /api/manga/:id/chapters`      | List chapter   |
| `GET /api/manga/chapter/:id/pages` | List halaman   |
| `GET /api/manga/image?url=...`     | Proxy image    |

> 💡 **Tip:** Install extension "REST Client" di VS Code, lalu buka `api.http` dan klik "Send Request" untuk test endpoint!

## 📂 Struktur Project

```
src/
├── types/          # TypeScript interfaces
├── services/       # Business logic & scraping
├── controllers/    # Request handlers
├── routes/         # URL routing
├── middleware/     # Error handling
└── config/         # Configuration
```

Clean Architecture = Mudah maintenance! 🎯

## 🛠️ Tech Stack

Node.js • Express.js • TypeScript • Axios

## 📄 License

MIT
