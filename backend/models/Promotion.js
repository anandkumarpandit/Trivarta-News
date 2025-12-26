const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['top_banner', 'inline_promo']
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL
        required: true
    },
    ctaText: {
        type: String,
        default: 'Learn More'
    },
    ctaLink: {
        type: String,
        default: '#'
    },
    active: {
        type: Boolean,
        default: true
    },
    displayDuration: {
        type: Number, // In milliseconds, relevant for top_banner
        default: 6000
    }
}, { timestamps: true });

module.exports = mongoose.model('Promotion', promotionSchema);
