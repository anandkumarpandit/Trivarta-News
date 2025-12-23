const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const { storage } = require('../config/cloudinary'); // Import Cloudinary storage

const upload = multer({ storage }); // Use Cloudinary storage

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
    if (req.file) req.body.image = req.file.path; // Use Cloudinary URL
    articleController.createArticle(req, res);
});
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
    if (req.file) req.body.image = req.file.path; // Use Cloudinary URL
    articleController.updateArticle(req, res);
});
router.delete('/:id', authMiddleware, articleController.deleteArticle);

module.exports = router;
