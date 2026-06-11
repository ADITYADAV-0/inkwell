# 📖 Inkwell — Full Stack MERN Blog Platform

A complete blogging platform built with MongoDB, Express, React (Vite), and Node.js.

---

## Project Structure

```
inkwell-fullstack/
├── client/                     ← React + Vite Frontend
│   ├── index.html
│   ├── vite.config.js
│   ├── .env                    ← VITE_API_URL
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx             ← Router + layout
│       ├── api/posts.js        ← All API calls
│       ├── context/ToastContext.jsx
│       ├── hooks/usePosts.js   ← CRUD state management
│       ├── components/
│       │   ├── UI.jsx          ← Shared UI components
│       │   └── PostCard.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── PostDetail.jsx
│       │   └── PostForm.jsx    ← Handles create & edit
│       └── styles/global.css
│
└── server/                     ← Express + MongoDB Backend
    ├── index.js
    ├── .env                    ← MONGO_URI + PORT
    ├── package.json
    ├── models/Post.js
    ├── routes/posts.js
    └── middleware/errorHandler.js
```

---

## Quick Start

### 1. Start the Backend
```bash
cd server
npm install
npm run dev     
```

### 2. Start the Frontend
```bash
cd client
npm install
npm run dev      
```

---

## API Endpoints

| Method | Endpoint      | Description         |
|--------|---------------|---------------------|
| GET    | /posts        | Fetch all posts     |
| GET    | /posts/:id    | Fetch a single post |
| POST   | /posts        | Create a new post   |
| PUT    | /posts/:id    | Update a post       |
| DELETE | /posts/:id    | Delete a post       |

---

