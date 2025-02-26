// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Настройка сессий
app.use(session({
    secret: process.env.SESSION_SECRET || 'PensAbobus22375', // Используй переменную окружения в продакшене
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/myshop',
        ttl: 14 * 24 * 60 * 60 // 14 дней
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 день
        httpOnly: true, // Защита от XSS
        secure: process.env.NODE_ENV === 'production', // Только HTTPS в продакшене
        sameSite: 'lax' // Защита от CSRF
    }
}));

// Middleware
app.use(cors({ credentials: true, origin: 'http://localhost:8080' })); // Укажи origin для кук
app.use(express.json());
app.use(express.static('C:/Users/Xasdan/Desktop/Pens/front-end/front-end-Vue/dist'));

// Маршруты
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);

// Перенаправление для Vue Router
app.get('*', (req, res) => {
    res.sendFile('C:/Users/Xasdan/Desktop/Pens/front-end/front-end-Vue/dist/index.html');
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Запуск сервера
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});