# 🚀 Math Adventure

**Math Adventure** adalah aplikasi pembelajaran matematika berbasis web yang dirancang khusus untuk siswa sekolah dasar (kelas 5-6). Aplikasi ini menggabungkan konsep belajar dengan elemen permainan (gamifikasi) untuk membuat matematika menjadi lebih menyenangkan.

![Math Adventure Logo](https://cdn-icons-png.flaticon.com/512/3413/3413535.png)

## ✨ Fitur Utama

- **Gamifikasi**: Dapatkan XP untuk setiap jawaban benar dan kumpulkan streak untuk naik level!
- **Mesin Soal Dinamis**: Soal dibuat otomatis berdasarkan level siswa (Penjumlahan, Perkalian, Pecahan, Desimal, Persentase, dan Soal Cerita).
- **Sistem Level Adaptif**: Tingkat kesulitan akan meningkat jika siswa menjawab benar terus-menerus, dan menurun jika mengalami kesulitan.
- **PWA (Progressive Web App)**: Bisa diinstal di layar utama HP (Android & iOS) dan diakses layaknya aplikasi asli.
- **Efek Suara Interaktif**: Memberikan umpan balik instan melalui suara yang ceria.
- **Dashboard Orang Tua**: Pantau progres, akurasi, dan statistik belajar anak.

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React.js, Vite, Tailwind CSS v4.
- **Animasi**: Framer Motion, Canvas Confetti.
- **Backend**: Supabase (PostgreSQL).
- **Deployment**: GitHub, aaPanel.

## 🚀 Cara Instalasi Lokal

1. **Clone repository ini**:
   ```bash
   git clone https://github.com/aanmochtar80/math-adventure.git
   cd math-adventure
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment**:
   Buat file `.env` di folder utama dan masukkan kredensial Supabase Anda:
   ```env
   VITE_SUPABASE_URL=URL_SUPABASE_ANDA
   VITE_SUPABASE_ANON_KEY=KEY_ANON_ANDA
   ```

4. **Jalankan aplikasi**:
   ```bash
   npm run dev
   ```

## 🌐 Cara Deployment di aaPanel

1. Buat website baru di aaPanel (PHP Project -> Static).
2. Masuk ke terminal server dan clone project.
3. Jalankan `npm install` dan `npm run build`.
4. Arahkan **Running Directory** ke folder `/dist`.
5. Tambahkan **URL Rewrite** Nginx berikut:
   ```nginx
   location / {
       try_files $uri $uri/ /index.html;
   }
   ```

## 📝 Changelog

Lihat histori perubahan lengkap di [CHANGELOG.md](./CHANGELOG.md).

---

Dibuat dengan ❤️ untuk pendidikan matematika yang lebih baik.
