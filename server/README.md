# 🚀 Evalify AI — Server API Guide

## ⚙️ Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Run server:

```bash
npm run dev
```

---

## 📁 Project Structure

```
server/
├── config/
│   ├── env.js            # Environment variable loader
│   ├── supabase.js       # Supabase client
│   └── claude.js         # Gemini AI client
├── controllers/
│   ├── auth.controller.js
│   ├── exam.controller.js
│   ├── evaluate.controller.js
│   └── results.controller.js
├── middleware/
│   ├── auth.js           # JWT authentication
│   ├── upload.js         # Multer file upload
│   └── errorHandler.js   # Global error handler
├── models/
│   ├── exam.model.js
│   ├── student.model.js
│   ├── evaluation.model.js
│   └── result.model.js
├── routes/
│   ├── index.js          # Route aggregator
│   ├── auth.routes.js
│   ├── exam.routes.js
│   ├── evaluate.routes.js
│   └── results.routes.js
├── services/
│   ├── claudeService.js      # Gemini AI service
│   ├── pdfService.js         # PDF/image processing
│   ├── evaluationService.js  # Core evaluation logic
│   └── exportService.js      # CSV/PDF export
├── utils/
│   ├── logger.js
│   ├── parser.js
│   └── promptBuilder.js
├── tests/
│   └── setup.js
├── uploads/              # Temp file storage
├── app.js                # Express app config
└── server.js             # Entry point
```

---

## 📡 API Endpoints

### Health Check

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | `/api/health` | ❌ | Server status |

**Example:**
```
GET http://localhost:5000/api/health
```
**Response:**
```json
{ "status": "ok", "timestamp": "2026-04-13T06:39:04.870Z" }
```

---

### 🔐 Authentication

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login & get token |
| GET | `/api/auth/me` | ✅ | Get current user |

#### Register

```
POST http://localhost:5000/api/auth/register
Content-Type: application/json
```
**Body:**
```json
{
  "email": "faculty@example.com",
  "password": "password123",
  "name": "John Doe"
}
```
**Response (201):**
```json
{
  "user": {
    "id": "uuid",
    "email": "faculty@example.com",
    "name": "John Doe",
    "role": "faculty"
  },
  "token": "eyJhbGciOi..."
}
```

#### Login

```
POST http://localhost:5000/api/auth/login
Content-Type: application/json
```
**Body:**
```json
{
  "email": "faculty@example.com",
  "password": "password123"
}
```
**Response (200):**
```json
{
  "user": { "id": "uuid", "email": "...", "name": "...", "role": "faculty" },
  "token": "eyJhbGciOi..."
}
```

#### Get Profile

```
GET http://localhost:5000/api/auth/me
Authorization: Bearer <token>
```

---

### 📝 Exams

> All exam routes require `Authorization: Bearer <token>` header.

| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/exams` | Create exam |
| GET | `/api/exams` | List all exams |
| GET | `/api/exams/:id` | Get single exam |
| DELETE | `/api/exams/:id` | Delete exam |
| POST | `/api/exams/extract-questions` | Extract questions from image |

#### Create Exam

```
POST http://localhost:5000/api/exams
Authorization: Bearer <token>
Content-Type: application/json
```
**Body:**
```json
{
  "title": "DSA Midterm",
  "subject": "Data Structures",
  "totalMarks": 100,
  "questions": [
    { "text": "Explain stack vs queue", "marks": 10 },
    { "text": "Write binary search code", "marks": 15 }
  ],
  "rubric": "Evaluate on correctness and clarity"
}
```

#### Extract Questions from Image

```
POST http://localhost:5000/api/exams/extract-questions
Authorization: Bearer <token>
Content-Type: multipart/form-data
```
**Form Data:**
- `questionPaper`: PDF or image file of question paper

---

### 🤖 Evaluation

> All evaluation routes require `Authorization: Bearer <token>` header.

| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/evaluate` | Upload & evaluate answer sheets |
| GET | `/api/evaluate/status/:examId` | Get evaluation progress |

#### Start Evaluation

```
POST http://localhost:5000/api/evaluate
Authorization: Bearer <token>
Content-Type: multipart/form-data
```
**Form Data:**
- `examId`: UUID of the exam
- `answerSheets`: Multiple PDF/image files (max 50, max 10MB each)

> File naming convention: `RollNo_StudentName.pdf` (e.g., `CS2024001_Alice.pdf`)

**Response:**
```json
{
  "message": "Evaluation complete",
  "examId": "uuid",
  "total": 3,
  "successful": 3,
  "failed": 0,
  "results": [
    {
      "student": { "rollNumber": "CS2024001", "name": "Alice" },
      "marksAwarded": 78,
      "maxMarks": 100,
      "resultId": "uuid"
    }
  ],
  "errors": []
}
```

#### Check Progress

```
GET http://localhost:5000/api/evaluate/status/<examId>
Authorization: Bearer <token>
```

---

### 📊 Results

> All result routes require `Authorization: Bearer <token>` header.

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/results/:examId` | Get all results for exam |
| GET | `/api/results/:examId/student/:studentId` | Get single student result |
| GET | `/api/results/:examId/export/csv` | Download CSV |
| GET | `/api/results/:examId/export/pdf` | Get PDF data |

#### Get Results

```
GET http://localhost:5000/api/results/<examId>
Authorization: Bearer <token>
```
**Response:**
```json
{
  "results": [...],
  "stats": {
    "totalStudents": 30,
    "average": 72.5,
    "highest": 95,
    "lowest": 45,
    "maxMarks": 100
  }
}
```

#### Export CSV

```
GET http://localhost:5000/api/results/<examId>/export/csv
Authorization: Bearer <token>
```
> Returns CSV file download with all student marks.

---

## 🔑 Auth Flow (Postman)

1. **Register** → `POST /api/auth/register` → get `token`
2. **Copy token** from response
3. For all other requests, add header:
   ```
   Authorization: Bearer <paste_token_here>
   ```
4. Token valid for **7 days**

---

## 🗄️ Database (Supabase)

### Tables

| Table | Purpose |
|-------|---------|
| `users` | Faculty accounts |
| `exams` | Exam configs + questions + rubric |
| `students` | Student records per exam |
| `evaluations` | Evaluation status tracking |
| `results` | Per-student marks + feedback |

### Setup

1. Go to Supabase Dashboard → SQL Editor
2. Run `supabase/migrations/001_create_tables.sql`
3. (Optional) Run `supabase/seed/seed.sql` for demo data

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5
- **AI:** Google Gemini 2.0 Flash (Vision API)
- **Database:** Supabase (PostgreSQL)
- **Auth:** JWT + bcrypt
- **File Upload:** Multer
- **Export:** csv-writer

---

## ❌ Error Codes

| Code | Meaning |
|------|---------|
| 400 | Bad request / missing fields |
| 401 | No token / invalid token / expired |
| 403 | Insufficient permissions |
| 404 | Route or resource not found |
| 413 | File too large (>10MB) or too many files (>50) |
| 415 | Unsupported file type |
| 500 | Internal server error |
