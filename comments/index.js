const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');

const app = express();

app.use(cors());
app.use(express.json());

const commentsData = {};

app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  res.json(commentsData[id] || []);
});
app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const { id } = req.params;

  const comments = commentsData[id] || [];

  comments.push({ id: commentId, content });

  commentsData[id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: id,
    },
  });

  res.status(201).json(comments[comments.length - 1]);
});

app.listen(4001, () => {
  console.log('comments => http://localhost:4001');
});
