# 🧠 Evalify AI — Backend Engine

The core evaluation engine for Evalify AI, powered by **Google Gemini 2.0/2.5 Flash**. This server handles automated grading of handwritten and printed exam papers, student management, and result analytics.

---

## ✨ Key Features

- **🤖 AI Multi-Model Evaluation**: Uses Gemini Vision API to read and grade handwritten answer sheets.
- **📄 Document Processing**: Automated extraction of questions from question paper images/PDFs.
- **📊 Real-time Analytics**: Calculates averages, highest marks, and grade distributions.
- **🔐 Secure Auth**: JWT-based authentication with Supabase integration.
- **📥 Bulk Processing**: Support for uploading up to 50 answer sheets in a single batch.
- **📤 Data Export**: Generate CSV reports of exam results for easy record-keeping.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (v18+)
- **Framework**: [Express.js 5](https://expressjs.com/)
- **AI Engine**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Security**: Helmet, CORS, Express-Rate-Limit, BCrypt
- **Storage**: Multer (Local temp storage) + Supabase Storage (Planned)

---

## ⚙️ Quick Start

### 1. Installation
```bash
cd server
npm install
```

### 2. Environment Setup
Create a `.env` file in the `server` root:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `GEMINI_API_KEY` | Your Google AI Studio API Key | (Required) |
| `SUPABASE_URL` | Supabase Project URL | (Required) |
| `SUPABASE_SERVICE_KEY` | Supabase Service Role Key | (Required) |
| `JWT_SECRET` | Secret key for JWT tokens | (Required) |
| `CLIENT_URL` | Frontend application URL | `http://localhost:5173` |

### 3. Database Setup
Run the migration scripts located in the root `/supabase` directory (if available) or create the following tables in your Supabase SQL editor:
- `users`, `exams`, `students`, `evaluations`, `results`.

### 4. Run Development Server
```bash
npm run dev
```

---

## 📁 Project Structure

```text
server/
├── src/
│   ├── config/           # App configurations (Supabase, Gemini)
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Auth, Upload, Error handling
│   ├── models/           # Data access layers (Supabase wrappers)
│   ├── routes/           # API route definitions
│   ├── services/         # Core logic (AI Evaluation, PDF parsing)
│   │   └── claudeService.js # Note: Uses Gemini (named for historical reasons)
│   ├── utils/            # Shared utilities (Logger, Prompt Builders)
│   ├── app.js            # Express app configuration
│   └── server.js         # Entry point
├── tests/                # Automated tests
└── uploads/              # Temporary storage for file processing
```

---

## 📡 API Reference

### 🔐 Authentication

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create a new faculty account |
| `POST` | `/api/auth/login` | Authenticate and receive JWT |
| `GET` | `/api/auth/me` | Get current user profile (Auth Required) |

### 📝 Exam Management

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/exams` | Create an exam with questions and rubric |
| `GET` | `/api/exams` | List all exams created by the user |
| `POST` | `/api/exams/extract-questions` | AI-extract questions from a JPG/PDF |

### 🤖 Evaluation Engine

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/evaluate` | Upload answer sheets & start evaluation |
| `GET` | `/api/evaluate/status/:id` | Poll status of a running evaluation |

> **Note on File Uploads**: Answer sheets should be named `RollNo_StudentName.pdf` for optimal student identification.

### 📊 Results & Export

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/results/:examId` | Fetch all student scores for an exam |
| `GET` | `/api/results/:examId/export/csv` | Download CSV gradebook |

---

## ⚠️ AI Rate Limits & Retries

The server includes built-in resilience for the Gemini API:
- **Exponential Backoff**: Automatically waits 40s if rate limited.
- **Model Fallback**: If `gemini-2.5-flash` fails, it falls back to `gemini-2.0-flash`.
- **Max Retries**: Attempts each request twice before failing.

---

## 📄 License
MIT License. Created by the Evalify AI Team.
