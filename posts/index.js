const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();

const posts = {};

app.use(cors());
app.use(express.json());

app.get('/posts', async (req, res) => {
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = { id, title };

  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  });

  res.status(201).json(posts[id]);
});

app.post('/events', (req, res) => {
  // axios.post('http://localhost:4000/events', event);

  console.log('Received Event: ', req.body.type);

  res.status(200).send();
});

app.listen(4000, () => {
  console.log('posts => http://localhost:4000');
});
