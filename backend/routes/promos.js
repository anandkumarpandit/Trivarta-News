const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary'); // Import Cloudinary storage
const { getPromos, createPromo, updatePromo, deletePromo } = require('../controllers/promoController');

const upload = multer({ storage }); // Use Cloudinary storage

// All routes are under /api/promotions
router.get('/', getPromos);

// Controller handles the file logic, just pass the middleware
router.post('/', upload.single('image'), createPromo);

router.put('/:id', upload.single('image'), updatePromo);

router.delete('/:id', deletePromo);

module.exports = router;
