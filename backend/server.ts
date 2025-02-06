import express from 'express';
import { connectDB } from './db/config.ts';

const app = express();

process.loadEnvFile();

const server = process.env.SERVER || 'http://localhost';
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log('Environment:', process.env.NODE_ENV);
  connectDB();
  console.log(`Server is running on ${server}:${port}`);
});
