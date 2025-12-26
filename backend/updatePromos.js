const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Promotion = require('./models/Promotion');

dotenv.config();

const updatePromos = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/news-portal');
        console.log('Connected to MongoDB');

        // Drop the unique index to allow multiple promotions of the same type
        try {
            await Promotion.collection.dropIndex('type_1');
            console.log('Dropped unique index type_1');
        } catch (e) {
            console.log('Index type_1 probably already dropped or doesn\'t exist');
        }

        // Update Top Banner
        await Promotion.findOneAndUpdate(
            { type: 'top_banner' },
            {
                title: 'Experience Premium Journalism',
                description: 'Join millions of readers who rely on our award-winning reporting. Subscribe today for exclusive insights.',
                ctaText: 'Start Free Trial',
                active: true
            }
        );
        console.log('Top Banner updated');

        // Ensure Inline Promo matches
        await Promotion.findOneAndUpdate(
            { type: 'inline_promo' },
            {
                title: 'Experience Premium Journalism',
                description: 'Join millions of readers who rely on our award-winning reporting. Subscribe today for exclusive insights.',
                ctaText: 'Start Free Trial',
                active: true
            }
        );
        console.log('Inline Promo updated');

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error(err);
    }
};

updatePromos();
