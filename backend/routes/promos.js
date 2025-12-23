const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary'); // Import Cloudinary storage
const { getPromos, createPromo, updatePromo, deletePromo } = require('../controllers/promoController');

const upload = multer({ storage }); // Use Cloudinary storage

// All routes are under /api/promotions
router.get('/', getPromos);
router.post('/', upload.single('image'), (req, res, next) => {
    if (req.file) req.body.image = req.file.path; // Use Cloudinary URL
    next();
}, createPromo);
router.put('/:id', upload.single('image'), (req, res, next) => {
    if (req.file) req.body.image = req.file.path; // Use Cloudinary URL
    next();
}, updatePromo);
router.delete('/:id', deletePromo);

module.exports = router;
