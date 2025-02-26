// Предположим, что мы уже импортировали модель Product
const Product = require('./models/Product');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Создание массива с данными товаров
const productsData = [
    {
        name: "Смартфон Pro Max 15",
        description: "Последняя модель смартфона с улучшенной камерой и увеличенным экраном.",
        price: 999.99,
        image: "https://example.com/images/smartphone-pro-max-15.jpg",
        category: "Электроника"
    },
    {
        name: "Умные часы FitTrack 3000",
        description: "Точные умные часы со встроенным GPS и мониторингом сердечного ритма.",
        price: 199.99,
        image: "https://example.com/images/fittrack-3000.jpg",
        category: "Электроника"
    },
    {
        name: "Кофемолка CoffeeGrind X1",
        description: "Автоматическая кофемолка с несколькими режимами помола для идеального кофе.",
        price: 79.99,
        image: "https://example.com/images/coffeegrind-x1.jpg",
        category: "Бытовая техника"
    },
    {
        name: "Велосипед MountainBike 2023",
        description: "Профессиональный горный велосипед с алюминиевой рамой и гидравлическими тормозами.",
        price: 499.99,
        image: "https://example.com/images/mountainbike-2023.jpg",
        category: "Спорт и отдых"
    }
];

// Функция для создания продуктов
async function createProducts() {
    try {
        // Для каждого элемента в массиве productsData создаем новый документ
        const products = await Promise.all(productsData.map(product => new Product(product).save()));
        console.log('Товары успешно созданы:', products);
    } catch (error) {
        console.error('Ошибка при создании товаров:', error);
    }
}

// Вызов функции
createProducts();