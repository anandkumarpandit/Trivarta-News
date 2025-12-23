const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer Setup for Image Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Public Routes
router.get('/', articleController.getArticles);
router.get('/trending', articleController.getTrending);
router.get('/breaking', articleController.getBreaking);
router.get('/:id', articleController.getArticleById);

// Protected Routes
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
    console.log('--- CREATE ARTICLE ---');
    console.log('Body:', req.body);
    console.log('File:', req.file);
    if (req.file) req.body.image = `/uploads/${req.file.filename}`;
    articleController.createArticle(req, res);
});
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
    if (req.file) req.body.image = `/uploads/${req.file.filename}`;
    articleController.updateArticle(req, res);
});
router.delete('/:id', authMiddleware, articleController.deleteArticle);

module.exports = router;
