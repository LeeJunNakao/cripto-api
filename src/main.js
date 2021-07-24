import express from 'express';
import { connectDb } from './database.js';
import routes from './routes.js';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
routes(app);

const startServer = async () => {
  await connectDb();
  app.listen(PORT, () => console.log(`Connected to PORT:${PORT}`));
};

startServer();
