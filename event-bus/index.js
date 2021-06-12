const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/events', async (req, res) => {
  const event = req.body;

  await axios.post('http://localhost:4000/events', event);
  await axios.post('http://localhost:4001/events', event);
  await axios.post('http://localhost:4002/events', event);
  await axios.post('http://localhost:4003/events', event);

  res.status(200).json({ message: 'success' });
});

app.listen(4005, () => console.log('Event service: http://localhost:4005'));
