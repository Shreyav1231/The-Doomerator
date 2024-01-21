const express = require('express');
const redis = require('redis');
const app = express();
const port = 3000;

const client = createClient({
    password: '**********',
    socket: {
        host: 'redis-11309.c325.us-east-1-4.ec2.cloud.redislabs.com',
        port: 11309
    }
});

app.get('/app-usage', (req, res) => {
  redisClient.get('app_usage_data', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.json(JSON.parse(data || '{}'));
    }
  });
});

app.get('/scroll-count', (req, res) => {
  redisClient.get('scroll_count_data', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.json({ scrollCount: parseInt(data) || 0 });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
