const express = require('express');
const router = express.Router();
const Promotion = require('../models/Promotion');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { storage } = require('../config/cloudinary');

const upload = multer({ storage: storage });

// @route   GET /api/promotions
// @desc    Get all promotions
// @access  Public
router.get('/', async (req, res) => {
    try {
        const promotions = await Promotion.find().sort({ createdAt: -1 }); // Get all, latest first
        res.json(promotions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/promotions
// @desc    Create a new promotion
// @access  Private
router.post('/', upload.single('image'), async (req, res) => {
    const { type, title, description, ctaText, ctaLink, active, displayDuration, videoUrl } = req.body;

    try {
        const promoFields = {
            type,
            title,
            description,
            ctaText,
            ctaLink,
            videoUrl,
            displayDuration: displayDuration || 6000,
            active: active === 'true' || active === true
        };

        if (req.file) {
            promoFields.image = req.file.path; // Use Cloudinary URL directly
        } else if (req.body.image) {
            promoFields.image = req.body.image;
        } else {
            return res.status(400).json({ msg: 'Image is required' });
        }

        const newPromo = new Promotion(promoFields);
        const promotion = await newPromo.save();
        res.json(promotion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/promotions/:id
// @desc    Update a promotion by ID
// @access  Private
router.put('/:id', upload.single('image'), async (req, res) => {
    const { title, description, ctaText, ctaLink, active, displayDuration, type, videoUrl } = req.body;

    // Build object
    const promoFields = {};
    if (type) promoFields.type = type;
    if (title) promoFields.title = title;
    if (description) promoFields.description = description;
    if (ctaText) promoFields.ctaText = ctaText;
    if (ctaLink) promoFields.ctaLink = ctaLink;
    if (videoUrl !== undefined) promoFields.videoUrl = videoUrl;
    if (displayDuration) promoFields.displayDuration = displayDuration;
    if (typeof active !== 'undefined') promoFields.active = active === 'true' || active === true;

    if (req.file) {
        promoFields.image = req.file.path; // Use Cloudinary URL directly
    } else if (req.body.image) {
        promoFields.image = req.body.image;
    }

    try {
        let promotion = await Promotion.findById(req.params.id);

        if (!promotion) {
            return res.status(404).json({ msg: 'Promotion not found' });
        }

        promotion = await Promotion.findByIdAndUpdate(
            req.params.id,
            { $set: promoFields },
            { new: true }
        );

        res.json(promotion);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Promotion not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/promotions/:id
// @desc    Delete a promotion
// @access  Private
router.delete('/:id', async (req, res) => {
    try {
        const promotion = await Promotion.findById(req.params.id);

        if (!promotion) {
            return res.status(404).json({ msg: 'Promotion not found' });
        }

        await Promotion.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Promotion removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Promotion not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
