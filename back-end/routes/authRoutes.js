// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Cart = require('../models/Cart');
// routes/authRoutes.js (продолжение)
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Проверяем, существует ли пользователь с таким email
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        // Создаем нового пользователя
        const user = new User({ name, email, password });
        await user.save();

        // Создаем пустую корзину для пользователя
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
        // Находим пользователя по email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Проверяем пароль
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Генерируем JWT токен
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { name: user.name, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
