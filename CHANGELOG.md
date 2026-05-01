# Changelog - Math Adventure

Semua perubahan dan perkembangan pada aplikasi Math Adventure akan dicatat di file ini.

## [1.2.0] - 2026-05-01
### Added
- **Fitur PWA (Progressive Web App)**: Aplikasi sekarang bisa diinstal di layar utama Android dan iOS.
- **Efek Suara**: Menambahkan suara "Ding" untuk jawaban benar, "Buzzer" untuk salah, dan suara selebrasi saat naik level.
- **Keyboard Numerik**: Mengubah input jawaban menjadi mode angka otomatis untuk memudahkan pengetikan di HP.
- **Sinkronisasi Visual**: Menyelaraskan logo di halaman Login dan Dashboard dengan ikon aplikasi.

### Fixed
- **Masalah Ikon iOS**: Memperbaiki ikon yang tidak muncul di iPhone dengan mengganti format SVG ke PNG yang didukung Safari.
- **Visual Dashboard**: Memperbaiki kartu Level dan XP yang sebelumnya terlihat kosong karena teks putih di atas latar belakang putih.

## [1.1.0] - 2026-05-01
### Added
- **Mesin Matematika Dinamis**: Pembuat soal otomatis untuk kategori Penjumlahan, Perkalian, Pecahan, Desimal, hingga Soal Cerita.
- **Sistem Gamifikasi**: Implementasi XP (+10/-2), Sistem Streak, dan Kenaikan Level otomatis.
- **Dashboard Orang Tua**: Statistik akurasi dan total soal yang dijawab.
- **Integrasi Supabase**: Persiapan koneksi ke database cloud untuk penyimpanan progres permanen.

### Changed
- **Desain UI/UX**: Menggunakan Tailwind CSS v4 dengan tema "Glassmorphism" yang ceria dan modern.
- **Bahasa**: Menyesuaikan seluruh antarmuka aplikasi ke dalam Bahasa Indonesia.

## [1.0.0] - 2026-05-01
### Added
- **Inisialisasi Proyek**: Setup awal menggunakan Vite, React, dan Tailwind CSS.
- **Sistem Login Sederhana**: Login hanya menggunakan nama tanpa password untuk memudahkan siswa.
- **Deployment**: Integrasi dengan GitHub dan panduan instalasi di aaPanel.
