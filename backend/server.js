// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors({
//     origin: process.env.FRONTEND_URL || '*',
//     credentials: true
// }));
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Database Connection
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/news-portal')
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => {
//         console.error('MongoDB Connection Error:', err);
//         process.exit(1);
//     });

// // API Routes
// app.use('/api/articles', require('./routes/articles'));
// app.use('/api/categories', require('./routes/categories'));
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/promotions', require('./routes/promos'));

// // Serve static files in production
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/dist')));

//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
//     });
// } else {
//     app.get('/', (req, res) => {
//         res.send('News Portal API is running');
//     });
// }

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Something went wrong!', error: err.message });
// });

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//     console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/news-portal')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });

// API Routes
app.use('/api/articles', require('./routes/articles'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/promotions', require('./routes/promos'));

// Serve static files in production (FIXED)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    // ✅ SPA fallback — NO '*'
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('News Portal API is running');
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});