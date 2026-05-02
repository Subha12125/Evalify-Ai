# 🚀 Evalify AI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)](https://nodejs.org/)
[![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini%202.5-orange)](https://aistudio.google.com/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-emerald)](https://supabase.com/)

**Evalify AI** is a cutting-edge, full-stack application designed for educators and academic institutions. It leverages state-of-the-art Generative AI (Google Gemini) to automate the evaluation of student answer sheets (handwritten or typed), providing instant grading, semantic analysis, and detailed feedback.

---

## 🧠 Key Features

- **Automated Grading**: Seamlessly evaluates student answer sheets against a master question paper and grading rubric.
- **Multimodal AI**: Supports both handwritten scans (OCR + Semantic Analysis) and typed PDFs.
- **Batch Processing**: Upload and evaluate an entire classroom's answer sheets in a single workflow.
- **Granular Analytics**: View average scores, performance bottlenecks (e.g., "Linked List Pointer Logic"), and individual student growth.
- **Live Progress Tracking**: Real-time status updates via polling during AI evaluation phases.
- **Data Portability**: Export comprehensive results in PDF and CSV formats for integration with official grading systems.
- **Premium UI/UX**: A responsive, modern dashboard built with a focus on usability and professional aesthetics.

---

## 🏗️ Technical Architecture

### Frontend
- **Framework**: React 18 with Vite for lightning-fast development.
- **State Management**: Zustand (Clean, lightweight, and atomic).
- **Styling**: Vanilla CSS with modern flexbox/grid and custom design tokens.
- **Routing**: React Router 6.

### Backend
- **Runtime**: Node.js & Express.js.
- **AI Engine**: Google Gemini API (Gemini 2.5 Flash for high-speed multimodal evaluation).
- **Authentication**: Secure JWT-based local authentication.
- **File Handling**: Multer for secure multipart/form-data ingestion.

### Infrastructure
- **Database**: PostgreSQL via Supabase.
- **Storage**: Supabase Storage for secure PDF/Image archival.

---

## ⚙️ Quick Start

### 1. Repository Setup
```bash
git clone https://github.com/Subha12125/Evalify-Ai.git
cd Evalify-Ai
```

### 2. Backend Configuration
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_service_role_key
GEMINI_API_KEY=your_google_ai_studio_key
JWT_SECRET=your_secure_random_secret
CLIENT_URL=http://localhost:5173
```
Run the server:
```bash
npm run dev
```

### 3. Frontend Configuration
```bash
cd ../client
npm install
```
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000
```
Run the client:
```bash
npm run dev
```

---

## 🔄 Core Workflow

1.  **Exam Creation**: Define the exam title, subject, and total marks.
2.  **Material Ingestion**: Upload the Question Paper, Grading Rubric, and Student Answer Sheets.
3.  **AI Orchestration**: The backend converts PDFs to images and feeds them into the Gemini 2.5 Flash model with specialized semantic prompts.
4.  **Result Persistence**: Marks and feedback are stored in PostgreSQL and linked to student profiles.
5.  **Review & Export**: Faculty reviews the AI insights and exports the data for record-keeping.

---

## 📊 API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/auth/register` | `POST` | User registration |
| `/api/auth/login` | `POST` | JWT-based login |
| `/api/exams` | `POST` | Initialize a new exam record |
| `/api/evaluate` | `POST` | Batch upload answer sheets & trigger AI |
| `/api/evaluate/status/:id` | `GET` | Poll live progress of an evaluation |
| `/api/results/:examId` | `GET` | Retrieve structured marks for an exam |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📌 Project Status

**Current Version**: 1.1.0 (Refactored Auth & Live Evaluation Flow)  
**Status**: Active Development  

---
Developed with ❤️ by the Evalify AI Team.