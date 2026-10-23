# PRD: Situs portfolio Kardi (bangkardi)

Versi 0.1, 21 Okt 2026. Dokumen ini untuk manusia. Versi ringkas untuk AI ada di `docs/ROADMAP.ai.md`.

## 1. Tujuan

1. **Utama:** menarik tech recruiter, headhunter, dan klien agar menawarkan pekerjaan atau proyek bernilai tinggi. Situs ini menjadi showcase utama selain LinkedIn.
2. **Kedua:** tempat bereksperimen dan belajar (Three.js, game ringan, teknologi lain), sekaligus melepas jenuh dari pekerjaan.
3. **Ketiga:** tempat menulis (catatan, novel) dan menaruh tools.

Kebutuhan 2 tidak boleh menghambat kebutuhan 1: versi sederhana harus rilis lebih dulu, eksperimen menyusul.

## 2. Posisi

- **Senior Full-Stack Engineer, 9+ tahun.** Situs ini membuktikan kemampuan full-stack (sistem produksi, keputusan teknis, hasil terukur).
- Transisi ke AI engineer berjalan di repo dan tempat diskusi lain. Proyek AI **baru masuk ke situs setelah pemilik menyatakan siap tampil**. Sampai saat itu, jangan ditampilkan atau diklaim.
- Semua klaim berasal dari CV (Kardiansyah CV.pdf). Tidak ada angka atau pengalaman tambahan.

## 3. Audiens

| Siapa | Waktu yang dimiliki | Apa yang dicari |
|---|---|---|
| Recruiter / headhunter | 10 sampai 30 detik | Level (senior), stack, lokasi/zona waktu, cara menghubungi, CV |
| Hiring manager / engineer | 2 sampai 5 menit | Bukti kedalaman: masalah, keputusan, hasil, trade-off |
| Klien proyek | beberapa menit | Bukti pernah menuntaskan produk dari awal sampai produksi |
| Pengunjung penasaran | bebas | Eksperimen yang menyenangkan |

Konsekuensi: halaman pertama harus langsung menjawab "siapa, level apa, bagaimana menghubungi" tanpa menunggu animasi.

## 4. Prinsip produk

1. **Cepat dan polos dulu, 3D belakangan.** Halaman lengkap tanpa JavaScript. Globe 3D adalah peningkatan opsional.
2. **Bukti di atas dekorasi.** Studi kasus bergaya "masalah, keputusan, hasil", bukan daftar teknologi.
3. **Satu sumber data.** Daftar proyek hidup di satu registry. Situs mana pun membaca dari sana.
4. **Rilis kecil, sering.** Satu eksperimen per beberapa minggu. Boleh tidak sempurna.
5. **Hormati pengunjung.** Reduced motion dihormati, tidak ada suara otomatis, ada tombol untuk mematikan 3D.
6. **Hormati kerahasiaan klien.** Untuk proyek instansi dan perusahaan: tulis arsitektur dan keputusan, bukan data, screenshot, atau nama internal yang sensitif.

## 5. Peta situs

| Alamat | Isi | Teknologi awal | Fase |
|---|---|---|---|
| `<domain>` | Gateway: headline, kontak, daftar studi kasus | Astro + React island (R3F) | 0 sampai 1 (sudah ada kerangka) |
| `cv.<domain>` | CV web + PDF ramah ATS | Astro | 2 |
| `catatan.<domain>` | Tulisan teknis, studi kasus panjang | Astro + MDX | 3 |
| `labs.<domain>` | Eksperimen Three.js dan game ringan | R3F / Phaser | 4 |
| `tools.<domain>` | Tools berjalan di browser | Astro atau Vite + React | 5 |
| `novel.<domain>` | Novel | Astro + MDX | 5 |
| `api.<domain>` | Backend demo (hanya bila diperlukan) | NestJS / FastAPI di Railway | 6 |

Domain belum dipilih (`.com` disarankan untuk jangkauan internasional, `.id` sebagai pengalihan).

## 6. Kebutuhan fungsional (gateway)

- F1. Tampilkan nama, level, ringkasan satu paragraf, lokasi dan zona waktu.
- F2. Tombol kontak utama (email). Tautan CV, LinkedIn, GitHub tampil hanya bila sudah diisi.
- F3. Daftar studi kasus dibaca dari registry. Tiap entri: periode, konteks, judul, ringkasan, stack, tautan (artikel, demo, repo) bila ada.
- F4. Globe 3D di hero, dimuat lazy, berhenti saat di luar layar, bisa dimatikan, pilihan tersimpan.
- F5. Fallback statis (SVG) bila JS mati, reduced motion, hemat data, atau WebGL tidak ada.
- F6. Mode terang dan gelap mengikuti sistem.
- F7. Metadata dasar: title, description, canonical, Open Graph, JSON-LD Person.

## 7. Kebutuhan non-fungsional

- **Performa:** JS awal (tanpa chunk 3D) maksimal 90 KB gzip. Saat ini sekitar 72 KB. Chunk 3D sekitar 240 KB gzip, hanya dimuat bila 3D aktif. Target Lighthouse mobile: Performance 90 ke atas, Accessibility 100.
- **Aksesibilitas:** fokus keyboard terlihat, skip link, kontras memadai, semua fungsi tanpa mouse, `prefers-reduced-motion` dihormati.
- **Kompatibilitas:** berfungsi di browser dalam aplikasi LinkedIn dan di layar 360 px.
- **Biaya:** hosting statis gratis di awal. Biaya berjalan hanya muncul bila ada backend.
- **Keamanan dan privasi:** tidak ada data pribadi di repo selain yang sengaja dipublikasikan. Demo yang memanggil API berbayar wajib punya rate limit dan batas pengeluaran.

## 8. Arah visual

- Warna: terang `#E9EFF0` (salt), tinta `#0F2A3D`, sekunder `#4B6878`, satu aksen merah sambal `#D9301F`. Mode gelap memakai `#0B1B29` dan aksen `#FF5A47`.
- Huruf: Bricolage Grotesque (variabel), satu keluarga untuk semuanya.
- Elemen yang diingat: **globe titik dengan garis khatulistiwa merah.** Khatulistiwa melintasi Kalimantan Barat, tempat Kardi bekerja 2018 sampai 2024. Semua elemen lain tenang.
- Dihindari: latar krem dengan aksen terakota, gelap dengan hijau neon, kartu seragam dengan bayangan, label kapital dengan jarak lebar, gradasi dekoratif, animasi masuk di setiap seksi.

## 9. Konten: kerangka studi kasus

Setiap studi kasus (di `catatan.` atau halaman proyek) memakai urutan ini:

1. Konteks dan peran (satu kalimat)
2. Masalah dan kendala
3. Keputusan yang diambil, dan alternatif yang ditolak
4. Hasil (angka dari CV saja)
5. Trade-off dan apa yang akan diubah sekarang
6. Stack, tautan demo atau repo bila ada

Empat entri awal sudah ada di registry dengan status `draft`: Voyage (pencarian Elasticsearch), MyConnect (pipeline rilis dan Sentry), Muneris (platform log keamanan), Seat booking (konsistensi pemesanan).

## 10. Hosting

- **Awal:** Cloudflare Pages (gratis) untuk semua situs statis. Aset besar (.glb, tekstur) di R2 karena batas 25 MiB per file di Pages.
- **Bila perlu backend:** Railway (Hobby sekitar $5 per bulan, ditambah pemakaian). Supabase gratis tidak cocok untuk demo publik karena proyek di-pause setelah seminggu tanpa aktivitas.
- **VPS (mis. Hostinger):** ditunda sampai ada beberapa layanan always-on atau ada keinginan belajar self-hosting.
- Harga dan batas berubah. Verifikasi di halaman resmi sebelum membayar.

## 11. Roadmap

| Fase | Isi | Selesai bila |
|---|---|---|
| 0 | Kerangka monorepo, registry, gateway dengan globe 3D | **Selesai.** Build dan type check lolos, diuji di Chromium (terang, gelap, mobile, reduced motion) |
| 1 | Peluncuran gateway: isi tautan, domain, deploy, OG image, sitemap, analytics | Situs publik, dapat dibuka recruiter, tautan CV/LinkedIn/GitHub aktif |
| 2 | `cv.` web + PDF ramah ATS | CV bisa dibuka dan diunduh, teks PDF bisa diseleksi |
| 3 | Studi kasus pertama tertulis lengkap | Minimal satu studi kasus terbit dan ditautkan dari gateway |
| 4 | `labs.` dengan eksperimen pertama | Satu eksperimen live, ditautkan dari gateway |
| 5 | `tools.`, `catatan.`, `novel.` | Masing-masing punya konten awal |
| 6 | Eksperimen dengan backend, demo seat booking dengan denah 3D | Demo live dengan batas biaya |
| 7 | Mode "Universe" 3D di gateway | Ada, tetap opsional |

## 12. Metrik keberhasilan

- Ada email atau pesan masuk dari recruiter atau klien yang menyebut situs ini.
- Tautan bertanda UTM (CV, LinkedIn) menunjukkan kunjungan ke situs.
- Waktu muat dan skor Lighthouse tetap dalam target.
- Eksperimen baru rilis secara berkala (indikator bahwa tujuan "bersenang-senang" terjaga).

## 13. Risiko

| Risiko | Tindakan |
|---|---|
| Terlalu lama memoles 3D sebelum rilis | Gateway sudah layak rilis di Fase 0. Eksperimen berbatas waktu |
| Berat di mobile dan di browser dalam aplikasi | Globe 3D lazy, titik dikurangi di layar kecil, dapat dimatikan |
| Membocorkan data klien | Tulis keputusan, bukan data. Minta izin dulu untuk proyek instansi |
| Klaim tidak sesuai CV | Semua teks berasal dari CV. Tinjau sebelum terbit |
| Biaya API pada demo publik | Rate limit, Turnstile, batas pengeluaran |

## 14. Pertanyaan terbuka (pemilik yang menjawab)

1. Nama domain dan registrar.
2. URL LinkedIn dan GitHub (CV berisi tautan tetapi PDF tidak menyertakan URL).
3. Nama tampilan: "Kardi", "Bang Kardi", atau "Kardiansyah".
4. Apakah nomor telepon boleh dipublikasikan (saat ini tidak dipublikasikan, hanya email).
5. Format CV di situs: halaman web, PDF, atau keduanya. PDF yang diunggah akan memuat data kontak di dalamnya.
6. Izin menulis studi kasus untuk proyek Softnet (instansi pemerintah) dan Pemerintah Provinsi Kalimantan Barat.
7. Foto atau avatar: pakai atau tidak.
8. Teks bahasa Indonesia: perlu atau cukup bahasa Inggris dulu.
