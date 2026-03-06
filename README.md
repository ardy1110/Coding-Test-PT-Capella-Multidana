# Coding Test - IT Department - PT Capella Multidana

Sistem Pengajuan Kredit 

## Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | React + Vite + TypeScript + Tailwind CSS |
| Backend | Express.js + Node.js |
| ORM | Prisma |
| Database | SQLite |

---

## Prasyarat

Pastikan tool terinstall :

- **Node.js** v18 atau lebih baru 
- **npm** (sudah included dengan Node.js)

Cek versi:
```bash
node -v
npm -v
```

> SQLite tidak perlu instalasi terpisah, Prisma akan otomatis membuat file database-nya.

---


## Setup & Menjalankan Backend

### 1. Masuk ke folder backend
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Buat file .env
Buat file `.env` di folder `backend` dengan isi berikut:
```env
DATABASE_URL="file:./dev.db"
PORT=5000
```



### 4. Buat file database
```bash
npx prisma migrate dev --name init
```

> Prisma akan otomatis membuat file `dev.db` di dalam folder `prisma/`. Tidak perlu setup database manual.

### 5. Jalankan server backend
```bash
npm start
```

Backend berjalan di: **http://localhost:5000**

Cek dengan membuka browser ke `http://localhost:5000/api/pengajuan` 


---

## Setup & Menjalankan Frontend

Buka **terminal baru** (jangan tutup terminal backend).

### 1. Masuk ke folder frontend
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Jalankan frontend
```bash
npm run dev
```

Frontend berjalan di: **http://localhost:5173**

Buka browser dan akses **http://localhost:5173**.

---

## Menjalankan Ulang (Setelah Setup Selesai)

Setelah setup pertama selesai, untuk menjalankan project selanjutnya cukup:

**Terminal 1 — Backend:**
```bash
cd backend
npm start
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

---

## Fitur Aplikasi

- **Form Pengajuan** — Catat data pengajuan kredit nasabah baru
- **Daftar Pengajuan** — Lihat semua pengajuan dalam tabel
- **Approve / Reject** — Ubah status pengajuan dengan dialog konfirmasi
- **Detail Pengajuan** — Lihat rincian kredit & kalkulasi tagihan per bulan

## Business Rules

| Aturan | Ketentuan |
|---|---|
| Pendapatan minimum nasabah | Rp 1.000.000 / bulan |
| Nominal pinjaman maksimal | Rp 200.000.000 |
| Tenor maksimal | 24 bulan |
| Batas pengajuan per nasabah | 3 kali |

---

## API Endpoints

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/pengajuan` | Ambil semua pengajuan |
| GET | `/api/pengajuan/:id` | Detail pengajuan by ID |
| POST | `/api/pengajuan` | Buat pengajuan baru |
| PATCH | `/api/pengajuan/:id/status` | Update status (APPROVED / REJECTED) |

---

## Troubleshooting

**Error: Could not find Prisma Schema**
Jalankan ulang langkah ke-4 untuk membuat file `prisma/schema.prisma`.

**Error: Environment variable not found: DATABASE_URL**
Pastikan file `.env` sudah dibuat di folder `backend` dan berisi `DATABASE_URL="file:./dev.db"`.

**Frontend tidak bisa connect ke backend**
Pastikan backend sudah berjalan di port 5000 sebelum membuka frontend.

**Port 5000 already in use**
Ganti `PORT` di file `.env` backend menjadi angka lain misalnya `PORT=5001`.
