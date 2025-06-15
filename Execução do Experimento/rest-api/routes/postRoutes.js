const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.find().populate('authorId');
  res.json(posts);
});

router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).populate('authorId');
  res.json(post);
});

module.exports = router;