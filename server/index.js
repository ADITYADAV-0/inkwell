const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const postRoutes = require('./routes/posts');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

/* ─── Middleware ─── */
app.use(cors({ origin: '*' })); // restrict to your frontend origin in production
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ─── Routes ─── */
app.get('/', (req, res) => res.json({ message: '📖 Inkwell API is running' }));
app.use('/posts', postRoutes);

/* ─── Error Handling ─── */
app.use(notFound);
app.use(errorHandler);

/* ─── DB + Server ─── */
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
