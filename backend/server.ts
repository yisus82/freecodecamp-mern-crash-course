import express from 'express';

const app = express();

process.loadEnvFile();

const port = process.env.PORT || 8080;
const server = process.env.SERVER || 'http://localhost';

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log('Environment:', process.env.NODE_ENV);
  console.log(`Server is running on ${server}:${port}`);
});
