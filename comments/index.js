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

  comments.push({ id: commentId, content, status: 'pending' });

  commentsData[id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: id,
      status: 'pending',
    },
  });

  res.status(201).json(comments[comments.length - 1]);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;

    const comments = commentsData[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }

  return res.status(200).json({ message: 'event-received' });
});

app.listen(4001, () => {
  console.log('comments => http://localhost:4001');
});
