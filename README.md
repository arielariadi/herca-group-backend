# Herca Group Backend ✨

Repository ini adalah bagian backend untuk tes coding di Herca Group

---

# Installation 🚀

1. Clone repository ini:
   ```bash
   git clone https://github.com/arielariadi/herca-group-backend.git
   ```

2. Install dependency
   ```bash
   npm install
   ```

3. Buat file .env di direktori root proyek dan tambahkan variabel yang dibutuhkan
   - PORT=your_port
   - DATABASE_URL="postgresql://username:password@localhost:5432/nama_database"
  
4. Menjalankan prisma migrate
   ```bash
   npx prisma migrate dev
   ```

5. Membuat seeds
   ```bash
   npm run seed
   ```

6. Menjalankan server
   ```bash
   npm run dev
   ```

# How to Use 🔎

* **[GET]** Marketings Commisions

  URL:
  `http://localhost:your_port/v1/marketings`

  <br>

* **[POST]** Credit Payments

  URL:
  `http://localhost:your_port/v1/payments`

  Header:
  * **Content-Type:** application/json
 
  Request:
  ```json
  {
    "penjualan_id": 1,
    "jumlah_pembayaran": 1000000,
    "tanggal_pembayaran": "2023-10-05"
  }
  ```

  <br>

* **[GET]** Payments History

  URL:
  `http://localhost:your_port/v1/payments/payments-history`

  <br>

# Tech Stack 💻
  1. **Express JS**
  2. **PostgreSQL**
  3. **Prisma**
