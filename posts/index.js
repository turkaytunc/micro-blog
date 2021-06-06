const express = require('express');
const { randomBytes } = require('crypto');

const app = express();

const posts = {};

app.use(express.json());

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = { id, title };

  res.status(201).json(posts[id]);
});

app.listen(4000, () => {
  console.log('posts => http://localhost:4000');
});
