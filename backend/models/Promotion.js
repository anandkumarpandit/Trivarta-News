const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String, // Path to the ad image
        required: false
    },
    linkUrl: {
        type: String, // URL the ad should link to
        required: true
    },
    videoUrl: {
        type: String, // Optional URL for video/reels
        required: false
    },
    position: {
        type: String,
        enum: ['left', 'right'],
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Promotion', adSchema);
