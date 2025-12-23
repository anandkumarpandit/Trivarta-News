const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getPromos, createPromo, updatePromo, deletePromo } = require('../controllers/promoController');

// Multer Setup for Promotion Images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// All routes are under /api/promotions
router.get('/', getPromos);
router.post('/', upload.single('image'), createPromo);
router.put('/:id', upload.single('image'), updatePromo);
router.delete('/:id', deletePromo);

module.exports = router;
