const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    const comment = posts[postId].comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', async (req, res) => {
  res.json(posts);
});

app.post('/events', (req, res) => {
  const { data, type } = req.body;

  handleEvent(type, data);

  return res.status(200).send();
});

app.listen(4002, async () => {
  console.log('query => http://localhost:4002');

  const response = await axios.get('http://localhost:4005/events');

  for (const event of response.data) {
    console.log('event type: ', event.type);

    handleEvent(event.type, event.data);
  }
});
