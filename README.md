# Ruang Tumbuh — Demo Bimbel

Demo website premium untuk bimbel dengan backend Go dan frontend Vite.

## Struktur

```text
.
├── Dockerfile
├── .dockerignore
├── backend
│   ├── data.go
│   ├── go.mod
│   ├── go.sum
│   ├── handlers.go
│   └── main.go
└── frontend
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    └── src
        ├── api.js
        ├── main.js
        ├── scene.js
        └── styles.css
```

## Run locally

Build frontend terlebih dahulu:

```powershell
cd frontend
npm install
npm run build
```

Jalankan backend:

```powershell
cd ../backend
go run .
```

Buka `http://localhost:8080`. Backend akan mencari `frontend/dist` dari parent directory dan melayani frontend sekaligus API.

Jika port 8080 sedang digunakan, jalankan dengan port lain:

```powershell
$env:PORT="8081"
go run .
```

Untuk development frontend dengan Vite, jalankan `npm run dev` dari folder `frontend`; proxy `/api` mengarah ke backend di port 8080.

## API

- `GET /api/programs`
- `GET /api/testimonials`
- `GET /api/tutors`
- `GET /api/stats`
- `POST /api/trial` dengan body `{ "name": "...", "phone": "...", "grade": "...", "program": "..." }`
- `GET /healthz` untuk health check

## Deploy to Render

1. Push repository ke GitHub.
2. Di Render pilih **New Web Service**.
3. Pilih repository ini.
4. Runtime: **Docker**.
5. Root Directory: kosongkan.
6. Dockerfile Path: `./Dockerfile`.
7. Instance: **Free**.
8. Region: **Singapore**.
9. Environment variables: tidak diperlukan.
10. Deploy service.

Dockerfile di root akan membangun frontend Vite, mengompilasi backend Go, lalu menjalankan satu container yang melayani halaman static dan API. Render akan memberikan nilai `PORT`; container juga memiliki default `10000`.
