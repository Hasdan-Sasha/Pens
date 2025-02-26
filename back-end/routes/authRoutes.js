// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Cart = require('../models/Cart');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        const user = new User({ name, email, password });
        await user.save();

        const cart = new Cart({ user: user._id, items: [] });
        await cart.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Сохраняем данные пользователя в сессии
        req.session.userId = user._id;
        req.session.user = { name: user.name, email: user.email };

        res.json({ message: 'Logged in successfully', user: req.session.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out' });
        }
        res.clearCookie('connect.sid'); // Очищаем куку сессии
        res.json({ message: 'Logged out successfully' });
    });
});

// Маршрут для проверки сессии
router.get('/check-session', (req, res) => {
    console.log('Session:', req.session);
    if (req.session.userId) {
        res.json({ authenticated: true, user: req.session.user });
    } else {
        res.json({ authenticated: false });
    }
});

module.exports = router;