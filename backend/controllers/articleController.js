const Article = require('../models/Article');

exports.getArticles = async (req, res) => {
    try {
        const { category, search, latest } = req.query;
        let query = {};
        if (category) {
            query.category = category;
        }
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }
        if (latest === 'true') {
            query.isLatest = { $ne: false };
        }
        const articles = await Article.find(query).populate('category').sort({ createdAt: -1 });
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('category');
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createArticle = async (req, res) => {
    try {
        const article = new Article(req.body);
        await article.save();
        res.status(201).json(article);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(article);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.json({ message: 'Article deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTrending = async (req, res) => {
    try {
        const articles = await Article.find({ isTrending: true }).sort({ createdAt: -1 }).limit(5).populate('category');
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBreaking = async (req, res) => {
    try {
        const articles = await Article.find({ isBreaking: true }).sort({ createdAt: -1 }).limit(5).populate('category');
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
