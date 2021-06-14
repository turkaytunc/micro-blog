const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

const events = [];

app.post('/events', async (req, res) => {
  const event = req.body;

  console.log('Event received: ', event.type);

  events.push(event);
  await axios.post('http://posts-clusterip-srv:4000/events', event);
  // await axios.post('http://localhost:4001/events', event);
  // await axios.post('http://localhost:4002/events', event);
  // await axios.post('http://localhost:4003/events', event);

  return res.status(200).send();
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => console.log('Event service: http://localhost:4005'));
