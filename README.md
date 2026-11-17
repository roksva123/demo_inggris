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

## Deploy ke Vercel + Render

Vercel cocok untuk frontend Vite, tetapi tidak menjalankan container Docker/HTTP server Go seperti `Dockerfile` di root. Karena itu deploy dibuat dua bagian:

### 1. Deploy backend Go ke Render

Ikuti langkah Render di bawah. Setelah berhasil, catat URL backend, misalnya `https://demo-inggris-api.onrender.com`.

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

Dockerfile di root membangun frontend Vite, mengompilasi backend Go, lalu menjalankan satu container yang melayani halaman static dan API. Render akan memberikan nilai `PORT`; container juga memiliki default `10000`.

### 2. Deploy frontend ke Vercel

1. Buka [vercel.com](https://vercel.com), login, lalu pilih **Add New → Project**.
2. Import repository GitHub ini.
3. Pada **Root Directory**, pilih `frontend`.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Tambahkan Environment Variable:
   - Name: `VITE_API_URL`
   - Value: URL backend Render, contoh `https://demo-inggris-api.onrender.com`
   - Environment: Production (boleh centang Preview juga)
8. Klik **Deploy**.

Kode frontend menggunakan `VITE_API_URL` untuk memanggil API backend. Jika variabel ini kosong, frontend memakai URL relatif `/api`, yang tetap cocok untuk deployment satu server seperti Docker/Render.

> Jika mengubah `VITE_API_URL` setelah deploy, lakukan **Redeploy** karena nilai `VITE_*` dimasukkan saat proses build frontend.
