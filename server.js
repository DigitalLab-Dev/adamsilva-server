import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import blogRouter from './routes/BlogRoutes.js';
import mongoose from 'mongoose';
import { connectDB } from './configs/db.js';

const app = express();
const PORT = process.env.PORT || 4000;

connectDB()

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://adamsilva-admin.vercel.app','https://adamsilvaconsulting.vercel.app','https://www.adamsilvaconsulting.com/'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Adam Silva server is running successfully');
});

app.use('/api/blogs', blogRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Digital Lab Server running at http://localhost:${PORT}`);
});
