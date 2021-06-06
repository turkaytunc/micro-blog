const express = require('express');
const { randomBytes } = require('crypto');

const app = express();

app.use(express.json());

const commentsData = {};

app.get('/posts/:id/comments', (req, res) => {
  res.json(commentsData);
});
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const { id } = req.params;

  const comments = commentsData[id] || [];

  comments.push({ id: commentId, content });

  commentsData[id] = comments;

  res.status(201).json(comments[comments.length - 1]);
});

app.listen(4001, () => {
  console.log('comments => http://localhost:4001');
});
