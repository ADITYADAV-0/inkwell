# 📖 Inkwell — React Frontend (Vite)

## Project Structure

```
inkwell-react/
├── index.html
├── vite.config.js
├── .env                        ← API URL config
├── package.json
└── src/
    ├── main.jsx                ← Entry point
    ├── App.jsx                 ← Router + layout
    ├── api/
    │   └── posts.js            ← All API calls
    ├── context/
    │   └── ToastContext.jsx    ← Global toast notifications
    ├── hooks/
    │   └── usePosts.js         ← CRUD state management
    ├── components/
    │   ├── UI.jsx              ← Shared: Navbar, Btn, Modal, Skeleton, etc.
    │   └── PostCard.jsx        ← Blog post card
    ├── pages/
    │   ├── Home.jsx            ← Post grid + search + hero
    │   ├── PostDetail.jsx      ← Full post view
    │   └── PostForm.jsx        ← Create & Edit form
    └── styles/
        └── global.css          ← Design tokens + animations
```

## Setup

```bash
npm install
npm run dev      # runs on http://localhost:3000
```

## Environment

Edit `.env` to point to your backend:
```env
VITE_API_URL=http://localhost:5000
```

The Vite dev server also proxies `/posts` to your backend automatically (see `vite.config.js`).

## Routes

| Path          | Component    | Description              |
|---------------|--------------|--------------------------|
| `/`           | Home         | Blog listing + search    |
| `/posts/:id`  | PostDetail   | Full post view           |
| `/new`        | PostForm     | Create new post          |
| `/edit/:id`   | PostForm     | Edit existing post       |
