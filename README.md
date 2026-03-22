<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:4f46e5,100:06b6d4&height=200&section=header&text=RAG%20Service&fontSize=40&fontColor=ffffff" />
</p>

<h3 align="center">🚀 Turn Documents & Websites into Intelligent AI APIs</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Java-SpringBoot-orange" />
  <img src="https://img.shields.io/badge/Python-RAG-blue" />
  <img src="https://img.shields.io/badge/React-Frontend-61dafb" />
  <img src="https://img.shields.io/badge/TailwindCSS-UI-38bdf8" />
  <img src="https://img.shields.io/badge/Firecrawl-Web%20Scraping-green" />
</p>

---

# 🚀 RAG Service (Retrieval-Augmented Generation)

An AI-powered **RAG-as-a-Service platform** to upload documents or crawl websites and query them via API.

Turn your data into a **searchable AI knowledge system**.

---

## 🌐 Features

- 📂 Document upload (PDF, DOCX, TXT)
- 🌐 Website ingestion (Firecrawl)
- 🔑 API key authentication
- 💬 Chat with your data
- ⚡ Fast RAG retrieval
- 🧠 Context-aware responses
- 🔌 REST API

---

## 👨‍💻 Team

| Name | Role | Contribution |
|------|------|-------------|
| **Sk Rijwan** | Team Lead | Coordination |
| **Tarapada Garai** | Backend Developer | API development, authentication, server logic |
| **Avinash Kr Mandal** | Frontend Developer | UI/UX design, React implementation |
| **Ankita Das** | Frontend Developer | UI components, styling, responsiveness |

---

### 🤝 Collaboration

- Designed and built during **BINARY v2 Hackathon**
- Followed modular architecture (Frontend + Backend + RAG pipeline)
- Worked in parallel using Git-based workflow

---

## 🧠 How It Works

1. Upload file / URL  
2. Generate embeddings  
3. Store in vector DB  
4. Query via API  
5. Get AI response  

---

## ⚙️ Tech Stack

**Backend:** Java (Spring Boot)  
**RAG Pipeline:** Python  
**Frontend:** React + Tailwind  
**Realtime:** Socket.IO  
**Ingestion:** Firecrawl  

---

## 🏗️ Architecture

### 🔷 Diagram

```mermaid
graph TD
A[Upload File/URL] --> B[Spring Boot API]
G[Firecrawl] --> B
B --> C[Python RAG Server]
C --> D[Embeddings]
C --> E[Vector DB]
E --> C
C --> B
B --> F[User Query]
