import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import CategoryPage from './pages/CategoryPage';
import SearchResults from './pages/SearchResults';
import AdminDashboard from './pages/AdminDashboard';
import AdminArticles from './pages/AdminArticles';
import ArticleForm from './pages/ArticleForm';
import ManageCategories from './pages/ManageCategories';
import Login from './pages/Login';
import Register from './pages/Register';
import ManagePromos from './pages/ManagePromos';
import PromoForm from './pages/PromoForm';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/articles" element={<CategoryPage />} />
              <Route path="/latest" element={<CategoryPage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/articles" element={<AdminArticles />} />
              <Route path="/admin/articles/new" element={<ArticleForm />} />
              <Route path="/admin/articles/edit/:id" element={<ArticleForm />} />
              <Route path="/admin/categories" element={<ManageCategories />} />
              <Route path="/admin/ads" element={<ManagePromos />} />
              <Route path="/admin/promotions" element={<ManagePromos />} />
              <Route path="/admin/promotions/new" element={<PromoForm />} />
              <Route path="/admin/promotions/edit/:id" element={<PromoForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
