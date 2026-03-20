# CV Builder

Aplikasi web untuk membuat CV profesional — isi manual atau upload PDF (AI ekstraksi otomatis), pilih template, lalu download sebagai PDF.

## Fitur

- **Form manual** — isi data profil, experience, education, skills, links
- **AI PDF Extractor** — upload CV lama (PDF), Claude AI otomatis isi form
- **3 Template** — Modern Sidebar, Classic Clean, Minimal Dark
- **Upload & crop foto** — khusus template Modern Sidebar
- **Live preview** — edit langsung lihat hasilnya
- **Download PDF** — satu klik, langsung save

## Setup Lokal

### 1. Prasyarat
- Node.js v18+ ([download](https://nodejs.org))
- npm (sudah include dengan Node.js)

### 2. Install dependencies

```bash
cd cv-builder
npm install
```

### 3. Jalankan dev server

```bash
npm run dev
```

Buka browser: **http://localhost:5173**

---

## Cara Pakai

### Tanpa AI (Manual)
1. Buka app → klik **"Isi Form Manual"**
2. Lengkapi semua section (Profil, Experience, Education, Skills, Links)
3. Klik **"Pilih Template"** → pilih template yang diinginkan
4. Klik **"Lanjut ke Editor"**
5. Di editor, gunakan sidebar kiri untuk edit data
6. Klik **"Download PDF"**

### Dengan AI (Upload PDF)
1. Siapkan **Anthropic API Key** dari https://console.anthropic.com
2. Di halaman utama, masukkan API Key di field yang tersedia
3. Drag & drop file PDF CV lama
4. Tunggu AI mengekstrak data (~5-10 detik)
5. Otomatis masuk ke halaman template
6. Edit jika diperlukan, lalu download PDF

---

## Build untuk Production

```bash
npm run build
```

Output ada di folder `dist/`.

---

## Deploy ke Netlify

### Cara 1: Drag & drop (paling mudah)
1. `npm run build`
2. Buka [netlify.com](https://netlify.com) → login
3. Drag folder `dist/` ke dashboard Netlify
4. Selesai — dapat URL langsung

### Cara 2: Via Git (recommended)
1. Push project ke GitHub
2. Di Netlify → "Add new site" → "Import an existing project"
3. Pilih repo GitHub
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy!

---

## Struktur Project

```
cv-builder/
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx    # Halaman utama (pilih metode input)
│   │   ├── FormPage.jsx       # Form editor lengkap
│   │   ├── TemplatePage.jsx   # Galeri pilih template
│   │   └── EditorPage.jsx     # Live editor + download PDF
│   ├── templates/
│   │   ├── ModernSidebar.jsx  # Template sidebar biru
│   │   ├── Classic.jsx        # Template klasik
│   │   └── Minimal.jsx        # Template minimal dark
│   ├── components/
│   │   └── PhotoUploader.jsx  # Modal upload & crop foto
│   ├── store/
│   │   └── cvStore.js         # Zustand global state
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── netlify.toml
```

## Tech Stack

- **React 18** + Vite
- **Tailwind CSS** — styling
- **Zustand** — state management (persisted ke localStorage)
- **React Router** — routing
- **react-easy-crop** — crop foto
- **react-dropzone** — drag & drop upload
- **html2pdf.js** — generate PDF
- **Anthropic Claude API** — ekstrak data dari PDF CV
- **lucide-react** — icons
