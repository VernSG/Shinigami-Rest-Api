# Shinigami REST API

REST API untuk scraping manga dari Shinigami yang dibangun dengan Express.js dan TypeScript.

> 🎉 **[Setup Complete Guide](SETUP_COMPLETE.md)** | 📚 **[Quick Start](docs/QUICKSTART.md)** | 📖 **[API Docs](docs/API_DOCUMENTATION.md)** | 🔧 **[Troubleshooting](docs/TROUBLESHOOTING.md)**

## 📋 Fitur

- ✅ Get popular manga
- ✅ Get latest manga updates
- ✅ Search manga
- ✅ Get manga details
- ✅ Get chapter list
- ✅ Get page list (images)
- ✅ Download images dengan proper headers
- ✅ Clean code architecture
- ✅ TypeScript support
- ✅ Error handling
- ✅ CORS enabled

## 🏗️ Struktur Project

```
shinigami-rest-api/
├── src/
│   ├── controllers/       # Logic untuk handle request
│   │   └── manga.controller.ts
│   ├── routes/           # Route definitions
│   │   ├── index.ts
│   │   └── manga.routes.ts
│   ├── services/         # Business logic & scraping
│   │   └── shinigami.service.ts
│   ├── types/            # TypeScript type definitions
│   │   └── manga.types.ts
│   ├── app.ts           # Express app configuration
│   └── server.ts        # Server entry point
├── dist/                # Compiled JavaScript files
├── .env.example         # Environment variables example
├── .gitignore
├── package.json
└── tsconfig.json
```

## 🚀 Quick Start

### Installation

```bash
npm install
```

2. Create `.env` file:

```bash
cp .env.example .env
```

3. Edit `.env` file sesuai kebutuhan:

```env
PORT=3000
NODE_ENV=development
```

### Development

```bash
# Start development server dengan hot reload
npm run dev

# Run tests (pastikan server sudah jalan)
npm test
```

### Production

```bash
# Build TypeScript ke JavaScript
npm run build

# Start production server
npm start
```

## 📚 API Endpoints

### Base URL

```
http://localhost:3000/api
```

### 1. Health Check

```
GET /api/health
```

### 2. Get Popular Manga

```
GET /api/manga/popular?page=1
```

**Response:**

```json
{
  "success": true,
  "data": {
    "mangas": [
      {
        "title": "Manga Title",
        "thumbnail": "https://...",
        "url": "manga-id",
        "mangaUrl": "https://app.shinigami.asia/series/manga-id"
      }
    ],
    "hasNextPage": true
  }
}
```

### 3. Get Latest Updates

```
GET /api/manga/latest?page=1
```

### 4. Search Manga

```
GET /api/manga/search?q=one piece&page=1
```

**Query Parameters:**

- `q` (required): Search query
- `page` (optional): Page number (default: 1)

### 5. Get Manga Details

```
GET /api/manga/:mangaId
```

**Example:**

```
GET /api/manga/one-piece-1234
```

**Response:**

```json
{
  "success": true,
  "data": {
    "title": "One Piece",
    "author": "Oda Eiichiro",
    "artist": "Oda Eiichiro",
    "status": "Ongoing",
    "description": "...",
    "genre": "Action, Adventure",
    "thumbnail": "https://..."
  }
}
```

### 6. Get Chapter List

```
GET /api/manga/:mangaId/chapters
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "name": "Chapter 1 Title",
      "dateUpload": 1638360000000,
      "url": "chapter-id",
      "chapterUrl": "https://app.shinigami.asia/series/manga-id/chapter-id"
    }
  ]
}
```

### 7. Get Page List (Images)

```
GET /api/manga/chapter/:chapterId/pages
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "index": 0,
      "imageUrl": "https://storage.shngm.id/..."
    }
  ]
}
```

### 8. Download Image

```
GET /api/manga/image?url=https://storage.shngm.id/...
```

**Query Parameters:**

- `url` (required): Image URL dari page list

**Response:** Image file (binary)

## 🔍 Error Response Format

```json
{
  "success": false,
  "error": "Error message here"
}
```

## 📝 Example Usage

### Using cURL

```bash
# Get popular manga
curl http://localhost:3000/api/manga/popular?page=1

# Search manga
curl "http://localhost:3000/api/manga/search?q=naruto&page=1"

# Get manga details
curl http://localhost:3000/api/manga/one-piece-1234

# Get chapters
curl http://localhost:3000/api/manga/one-piece-1234/chapters

# Get pages
curl http://localhost:3000/api/manga/chapter/chapter-id-123/pages

# Download image
curl "http://localhost:3000/api/manga/image?url=https://storage.shngm.id/..." --output image.jpg
```

### Using JavaScript/Fetch

```javascript
// Get popular manga
const response = await fetch("http://localhost:3000/api/manga/popular?page=1");
const data = await response.json();
console.log(data);

// Search manga
const searchResponse = await fetch(
  "http://localhost:3000/api/manga/search?q=naruto&page=1"
);
const searchData = await searchResponse.json();
console.log(searchData);
```

## � Documentation

- **[Quick Start Guide](docs/QUICKSTART.md)** - Panduan cepat untuk memulai
- **[API Documentation](docs/API_DOCUMENTATION.md)** - Dokumentasi lengkap semua endpoint
- **[Examples](docs/EXAMPLES.md)** - Contoh request dan response
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Panduan mengatasi masalah
- **[Changelog](docs/CHANGELOG.md)** - Riwayat perubahan
- **[API Response Notes](docs/API_RESPONSE_NOTES.md)** - Struktur response API

## �🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📄 License

MIT

## 👤 Author

Shinigami REST API - Built with ❤️
