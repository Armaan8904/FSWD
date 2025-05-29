const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const { GridFSBucket } = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;

let gfs;
let gridFSBucket;

conn.once('open', () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'resumes' });
  gfs = gridFSBucket;
  console.log('MongoDB connected and GridFS ready');
});

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return { filename: file.originalname, bucketName: 'resumes' };
  }
});

const upload = multer({ storage });

// Upload Route
app.post('/upload', upload.single('resume'), (req, res) => {
  res.status(201).json({ message: 'Resume uploaded', file: req.file });
});

// Download Route
app.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  gfs.find({ filename }).toArray((err, files) => {
    if (!files || files.length === 0) return res.status(404).send('No file found');
    gridFSBucket.openDownloadStreamByName(filename).pipe(res);
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
