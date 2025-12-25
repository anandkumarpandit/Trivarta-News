import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { AuthContext } from './AuthContextCore';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = () => {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            if (storedUser && token) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    const register = async (username, email, password, secretKey) => {
        try {
            await api.post('/auth/register', { username, email, password, secretKey });
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
            return { success: false, message: errorMessage };
        }
    };

    const login = async (username, password) => {
        try {
            const { data } = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Login failed';
            return { success: false, message: errorMessage };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
