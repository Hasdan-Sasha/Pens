// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

app.use(session({
    secret: 'PensAbobus22375',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: 'mongodb://localhost:27017/myshop',
        ttl: 14 * 24 * 60 * 60 // 14 дней
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 день
    }
}));
// Middleware
app.use(cors());
app.use(express.json());
// Подача статических файлов Vue приложения
app.use(express.static('C:/Users/Xasdan/Desktop/Pens/front-end/front-end-Vue/dist'));

// Перенаправление всех запросов на index.html (для Vue Router history mode)

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Маршруты
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);
// Запуск сервера
app.get('*', (req, res) => {
    res.sendFile('C:/Users/Xasdan/Desktop/Pens/front-end/front-end-Vue/dist/index.html');
});

app.use((err, req, res, next) => {
    console.error(err.stack); // Log the full error stack
    res.status(500).json({ message: 'Something went wrong!' });
  });
  
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});