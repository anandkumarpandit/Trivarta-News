const Promotion = require('../models/Promotion');

// @desc    Get all promotions
// @route   GET /api/promotions
// @access  Public
exports.getPromos = async (req, res) => {
    try {
        const promos = await Promotion.find().sort({ createdAt: -1 });
        res.status(200).json(promos);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Create a promotion
// @route   POST /api/promotions
// @access  Private/Admin
exports.createPromo = async (req, res) => {
    try {
        console.log('Create Promo Body:', req.body);
        console.log('Create Promo File:', req.file);

        const { title, linkUrl, position, videoUrl } = req.body;
        let imageUrl = req.body.imageUrl;
        let finalVideoUrl = videoUrl;

        // If file uploaded, use it
        if (req.file) {
            // Check if uploaded file is a video
            const isVideo = req.file.mimetype && req.file.mimetype.startsWith('video');

            if (isVideo) {
                finalVideoUrl = req.file.path; // Cloudinary Video URL
            } else {
                imageUrl = req.file.path; // Cloudinary Image URL
            }
        }

        // Removed mandatory imageUrl check as requested

        const newPromo = new Promotion({
            title,
            imageUrl,
            linkUrl,
            position,
            videoUrl: finalVideoUrl
        });

        const savedPromo = await newPromo.save();
        res.status(201).json(savedPromo);
    } catch (err) {
        console.error('Create Promo Error:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Update a promotion
// @route   PUT /api/promotions/:id
// @access  Private/Admin
exports.updatePromo = async (req, res) => {
    try {
        console.log('Update Promo Body:', req.body);
        console.log('Update Promo File:', req.file);

        const promo = await Promotion.findById(req.params.id);
        if (!promo) return res.status(404).json({ message: 'Promotion not found' });

        const updateData = { ...req.body };
        if (req.file) {
            updateData.imageUrl = req.file.path; // Cloudinary URL
        }

        const updatedPromo = await Promotion.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        );

        res.status(200).json(updatedPromo);
    } catch (err) {
        console.error('Update Promo Error:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Delete a promotion
// @route   DELETE /api/promotions/:id
// @access  Private/Admin
exports.deletePromo = async (req, res) => {
    try {
        const promo = await Promotion.findById(req.params.id);
        if (!promo) return res.status(404).json({ message: 'Promotion not found' });

        await Promotion.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Promotion removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
