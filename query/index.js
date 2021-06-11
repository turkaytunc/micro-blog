const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', async (req, res) => {
  res.json(posts);
});

app.post('/events', (req, res) => {
  const { data, type } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    posts[postId].comments.push({ id, content });
  }

  console.log(JSON.stringify(posts));

  return res.status(200).send();
});

app.listen(4002, () => {
  console.log('query => http://localhost:4002');
});
