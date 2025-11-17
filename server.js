import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import blogRouter from './routes/BlogRoutes.js';
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 4000;


mongoose.connect(process.env.MONGODB_URL, {
  family: 4,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 75000,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err.message));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://digitallab-admin.vercel.app",
      "https://digitallab-xi.vercel.app",
      "https://www.digitallabservices.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Adam Silva server is running successfully');
});


app.use('/api/blogs', blogRouter);

app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Digital Lab Server running at http://localhost:${PORT}`);
});
