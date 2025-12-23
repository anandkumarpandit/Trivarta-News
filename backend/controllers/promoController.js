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

        // If file uploaded, use it
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        if (!imageUrl) {
            return res.status(400).json({ message: 'Image URL or Uploaded Image is required' });
        }

        const newPromo = new Promotion({
            title,
            imageUrl,
            linkUrl,
            position,
            videoUrl
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
            updateData.imageUrl = `/uploads/${req.file.filename}`;
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
