const products = [
    {
        name: "smartphone",
        image: "/images/smartphone.png",
        description: "Описание отсутствует",
        price: 0,
        category: "Без категории"
    },
    {
        name: "coffee-machine",
        image: "/images/coffee-machine.png",
        description: "Описание отсутствует",
        price: 0,
        category: "Без категории"
    },
    {
        name: "bicycle",
        image: "/images/bicycle.png",
        description: "Описание отсутствует",
        price: 0,
        category: "Без категории"
    },
    {
        name: "headphones",
        image: "/images/headphones.png",
        description: "Описание отсутствует",
        price: 0,
        category: "Без категории"
    }
];
// Подключение к MongoDB
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Определение модели Product
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Добавление товаров в базу данных
const seedProducts = async () => {
    try {
        // Удаление существующих товаров (опционально)
        await Product.deleteMany({});

        // Добавление новых товаров
        const result = await Product.insertMany(products);
        console.log('Products added successfully:', result);
    } catch (error) {
        console.error('Error adding products:', error);
    } finally {
        // Закрытие соединения с базой данных
        mongoose.connection.close();
    }
};

seedProducts();