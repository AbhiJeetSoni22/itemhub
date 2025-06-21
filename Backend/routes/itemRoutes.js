import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Item from '../models/item.js'; // Fix case sensitivity
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images (jpeg, jpg, png, gif) are allowed'));
  },
});

router.post('/items', upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'additionalImages', maxCount: 10 },
]), async (req, res) => {
  try {
    const { name, type, description } = req.body;

    // Validate required fields
    if (!name || !type || !description) {
      return res.status(400).json({ error: 'Name, type, and description are required' });
    }

    // Validate coverImage
    if (!req.files || !req.files.coverImage || !req.files.coverImage[0]) {
      return res.status(400).json({ error: 'Cover image is required' });
    }

    const coverImage = req.files.coverImage[0].path.replace(/\\/g, '/');
    const additionalImages = req.files.additionalImages
      ? req.files.additionalImages.map(file => file.path.replace(/\\/g, '/'))
      : [];

    const item = new Item({
      name,
      type,
      description,
      coverImage: `/${coverImage}`,
      additionalImages: additionalImages.map(img => `/${img}`),
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error('Upload error:', error); // Log detailed error
    res.status(500).json({ error: 'Error adding item', details: error.message });
  }
});

router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Error fetching items' });
  }
});

router.post('/enquire', async (req, res) => {
  try {
    const { itemId } = req.body;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

  
    res.status(200).json({ message: 'Enquiry sent' });
  } catch (error) {
    console.error('Enquiry error:', error);
    res.status(500).json({ error: 'Error sending enquiry' });
  }
});

export default router;