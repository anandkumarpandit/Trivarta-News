const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs'); // ✅ CHANGED

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log('--- DEPLOYMENT DIAGNOSTICS ---');
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Port: ${PORT}`);
console.log('------------------------------');

// ✅ CHANGED: allow local + production frontends
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            'https://trivartanews.onrender.com',
            'https://trivarta.onrender.com'
        ];

        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Allow any localhost origin
        if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/news-portal')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/promotions', require('./routes/promotions'));
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date(),
        env: process.env.NODE_ENV,
        frontendPath: path.join(__dirname, '../frontend/dist'),
        frontendExists: fs.existsSync(path.join(__dirname, '../frontend/dist'))
    });
});
console.log('✓ All API routes registered');
console.log('  - /api/articles');
console.log('  - /api/categories');
console.log('  - /api/auth');
console.log('  - /api/promotions');

if (process.env.NODE_ENV === 'production') {

    const frontendPath = path.join(__dirname, '../frontend/dist'); // ✅ CHANGED

    if (fs.existsSync(frontendPath)) { // ✅ CHANGED
        app.use(express.static(frontendPath));

        app.get(/.*/, (req, res) => {
            res.sendFile(path.join(frontendPath, 'index.html'));
        });
    } else {
        console.log('❌ CRITICAL: Frontend build NOT found at:', frontendPath);
        console.log('Contents of ../frontend:', fs.existsSync(path.join(__dirname, '../frontend')) ? fs.readdirSync(path.join(__dirname, '../frontend')) : 'Directory missing');
        app.get('/', (req, res) => res.send('Frontend build missing - Check build logs'));
    }

} else {
    app.get('/', (req, res) => {
        res.send('News Portal API is running');
    });
}

// ✅ CHANGED: clearer CORS error handling
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            message: 'CORS Error',
            origin: req.headers.origin
        });
    }

    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});