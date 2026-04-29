# Evalify AI — Frontend

> AI-powered academic evaluation platform built with React 19, Vite, and Tailwind CSS.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| Typography | Manrope (Headlines) + Inter (Body) |
| Icons | Material Symbols Outlined |

---

## 📁 Project Structure

```
client/
├── public/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Layout.jsx        # Root layout with sidebar + navbar + footer
│   │       ├── Sidebar.jsx       # Responsive drawer navigation
│   │       └── Navbar.jsx        # Top bar with actions
│   ├── context/
│   │   └── ToastContext.jsx      # Global toast notification system
│   ├── pages/
│   │   ├── Login.jsx             # Authentication screen
│   │   ├── Dashboard.jsx         # Stats, chart, recent activity
│   │   ├── Exams.jsx             # Exam list management
│   │   ├── CreateExam.jsx        # Multi-step document upload
│   │   ├── ExamDetail.jsx        # Per-student AI evaluation detail
│   │   ├── EvaluationProgress.jsx# Real-time grading progress
│   │   ├── Results.jsx           # Student performance matrix
│   │   ├── Settings.jsx          # Profile, preferences, danger zone
│   │   ├── Pricing.jsx           # Indian pricing with GST
│   │   └── NotFound.jsx          # 404 page
│   ├── router/
│   │   └── index.jsx             # Route definitions
│   ├── index.css                 # Global styles + animations
│   ├── App.jsx                   # App entry
│   └── main.jsx                  # React DOM mount
├── tailwind.config.js            # Design tokens (Material 3 palette)
├── package.json
└── README.md
```

---

## 🎨 Design System

Based on **Material Design 3** color tokens with a custom editorial aesthetic.

### Color Palette
- **Primary**: `#2036bd` (Deep Indigo)
- **Secondary**: `#712ae2` (Vivid Purple)
- **Error**: `#ba1a1a`
- **Surface tiers**: 5 levels from `#ffffff` to `#e0e3e5`

### Design Rules
- **No-Line Rule** — No 1px borders. Use surface-tier background shifts instead.
- **Atmospheric Shadows** — Soft, layered box-shadows for depth.
- **Glassmorphism** — `backdrop-blur` on floating elements (navbar, insight rails).

---

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | Faculty authentication with password toggle + SSO |
| Dashboard | `/dashboard` | 4 stat cards, bar chart, activity table, AI insights |
| Exams | `/exams` | List of all examination materials |
| Create Exam | `/create-exam` | Drag-and-drop upload for papers, rubrics, answer sheets |
| Exam Detail | `/exams/:id` | Per-student score breakdown with AI feedback |
| Evaluation | `/evaluation-progress` | Real-time progress ring + stepper + engine logs |
| Results | `/results` | Student performance matrix with filtering |
| Settings | `/settings` | Profile editing, preferences toggles, account deletion |
| Pricing | `/pricing` | ₹ pricing with monthly/annual toggle, FAQ, enterprise CTA |
| 404 | `*` | Friendly not-found page with navigation |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🧩 Key Features

- **Responsive Layout** — Mobile drawer sidebar, adaptive grids, scrollable tables
- **Page Transitions** — Smooth fade-in animation on route change
- **Toast Notifications** — Global feedback system via `useToast()` hook
- **Password Visibility Toggle** — Show/hide on login form
- **Interactive Dashboard** — Clickable stat cards navigate to detail pages
- **Indian Pricing** — ₹ currency, GST @18% note, UPI/Net Banking FAQ
- **Skeleton Loading CSS** — `.skeleton` class ready for async data

---

## 🔗 Backend Integration (Planned)

The frontend is currently using mock data. To connect with the backend:

1. Set `VITE_API_URL` in `.env`
2. Replace mock data in pages with API calls via custom hooks (`useAuth`, `useExam`, `useUpload`)
3. Backend stack: **Node.js + Express + Supabase + Gemini API**

---

## 📜 License

Private — Evalify AI © 2026
