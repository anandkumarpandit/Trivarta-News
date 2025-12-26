import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle, FaSearch, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [search, setSearch] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const categories = ['Technology', 'Business', 'Sports', 'Entertainment', 'Health', 'Science', 'Politics', 'World'];

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search?q=${search}`);
            setSearch('');
        }
    };

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.documentElement.setAttribute('data-theme', !darkMode ? 'dark' : 'light');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            {/* Overlay for mobile menu */}
            <div
                className={`navbar-overlay ${menuOpen ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
            ></div>
            <div className="container navbar-container">
                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

                <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
                    TrivartaNews<span className="dot">.</span>
                </Link>

                <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                    <div className="nav-main">
                        <Link to="/latest" className="nav-link nav-link-featured" onClick={() => setMenuOpen(false)}>Latest News</Link>
                        {categories.slice(0, 5).map(cat => (
                            <Link key={cat} to={`/category/${cat}`} className="nav-link" onClick={() => setMenuOpen(false)}>
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="navbar-actions">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-btn"><FaSearch /></button>
                    </form>

                    <button onClick={toggleTheme} className="theme-btn">
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>

                    {user ? (
                        <div className="user-menu">
                            <span className="username">{user.username}</span>
                            <button onClick={logout} className="btn-outline btn-sm">Logout</button>
                            <Link to="/admin" className="btn btn-sm">Dashboard</Link>
                        </div>
                    ) : (
                        <Link to="/login" className="login-icon">
                            <FaUserCircle size={24} />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
