import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login(username, password);
        if (res.success) {
            navigate('/admin');
        } else {
            alert(`Login Failed: ${res.message}`);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '4rem' }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                        required
                    />
                </div>
                <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
            </form>
            <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;
