import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import itemRoutes from './routes/itemRoutes.js';

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors({ origin: ['http://localhost:5173',' http://localhost:4173/','https://itemhub-kmpeeahoi-abhijeet-sonis-projects.vercel.app/'] }));
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));
app.get('/', (req, res) => {
  res.send('API is up');
});
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected '))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api', itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));