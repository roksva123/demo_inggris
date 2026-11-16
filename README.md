# Ruang Tumbuh — Demo Bimbel

Demo website premium untuk bimbel dengan backend Go dan frontend Vite.

## Struktur

```text
.
├── data.go
├── handlers.go
├── main.go
├── go.mod
└── frontend
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src
        ├── api.js
        ├── main.js
        ├── scene.js
        └── styles.css
```

## Menjalankan mode development

Terminal 1:

```powershell
cd frontend
npm install
npm run dev
```

Terminal 2:

```powershell
go run .
```

Buka `http://localhost:5173`. Vite meneruskan `/api` ke Go di port 8080.

## Build untuk dilayani Go

Jika terminal sedang berada di folder root `C:\demo_inggris`, gunakan:

```powershell
npm --prefix .\frontend install
npm --prefix .\frontend run build
go run .
```

Jika terminal sedang berada di folder `C:\demo_inggris\frontend`, gunakan tanpa prefix. Jangan gunakan `npm --prefix .\frontend` dari folder ini karena itu akan membuat instalasi nested `frontend\frontend`:

```powershell
npm install
npm run build
cd ..
go run .
```

Jangan menjalankan `npm --prefix frontend run build` dari dalam folder `frontend`, karena npm akan mencari `C:\demo_inggris\frontend\frontend\package.json`.

Buka `http://localhost:8080`. Go akan melayani `frontend/dist` sekaligus endpoint JSON.

## Endpoint

- `GET /api/programs`
- `GET /api/testimonials`
- `GET /api/tutors`
- `GET /api/stats`
- `POST /api/trial` dengan body `{ "name": "...", "phone": "...", "grade": "...", "program": "..." }`
