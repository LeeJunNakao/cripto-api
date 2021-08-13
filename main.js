import express from 'express';
import { connectDb } from './src/database.js';
import routes from './src/routes.js';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use('/currency', routes);

const startServer = async () => {
  await connectDb();
  app.listen(PORT, () => console.log(`Connected to PORT:${PORT}`));
};

startServer();
