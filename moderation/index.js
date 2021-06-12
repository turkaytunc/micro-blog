const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('fuck') ? 'rejected' : 'approved';

    axios.post('http://localhost:4005', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status,
      },
    });
  }
});

app.listen(4003, () => {
  console.log('moderation => http://localhost:4003');
});
