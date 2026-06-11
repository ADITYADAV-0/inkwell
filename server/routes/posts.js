const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/* ────────────────────────────────────
   GET /posts  — fetch all posts
   ──────────────────────────────────── */
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // newest first
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

/* ────────────────────────────────────
   GET /posts/:id  — fetch one post
   ──────────────────────────────────── */
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    // invalid ObjectId format → treat as not found
    if (err.name === 'CastError') return res.status(404).json({ message: 'Post not found' });
    next(err);
  }
});

/* ────────────────────────────────────
   POST /posts  — create a post
   ──────────────────────────────────── */
router.post('/', async (req, res, next) => {
  try {
    const { title, summary, content, author, category } = req.body;

    // Basic validation
    const errors = [];
    if (!title?.trim())   errors.push('Title is required');
    if (!summary?.trim()) errors.push('Summary is required');
    if (!content?.trim()) errors.push('Content is required');
    if (errors.length) return res.status(400).json({ message: errors.join(', ') });

    const post = await Post.create({ title, summary, content, author, category });
    res.status(201).json(post);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((e) => e.message).join(', ');
      return res.status(400).json({ message });
    }
    next(err);
  }
});

/* ────────────────────────────────────
   PUT /posts/:id  — update a post
   ──────────────────────────────────── */
router.put('/:id', async (req, res, next) => {
  try {
    const { title, summary, content, author, category } = req.body;

    // At least one field must be provided
    if (!title && !summary && !content && !author && !category) {
      return res.status(400).json({ message: 'No fields to update provided' });
    }

    const updates = {};
    if (title    !== undefined) updates.title    = title;
    if (summary  !== undefined) updates.summary  = summary;
    if (content  !== undefined) updates.content  = content;
    if (author   !== undefined) updates.author   = author;
    if (category !== undefined) updates.category = category;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    if (err.name === 'CastError')       return res.status(404).json({ message: 'Post not found' });
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((e) => e.message).join(', ');
      return res.status(400).json({ message });
    }
    next(err);
  }
});

/* ────────────────────────────────────
   DELETE /posts/:id  — delete a post
   ──────────────────────────────────── */
router.delete('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully', id: req.params.id });
  } catch (err) {
    if (err.name === 'CastError') return res.status(404).json({ message: 'Post not found' });
    next(err);
  }
});

module.exports = router;
