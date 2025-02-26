// Подключение модулей
const mongoose = require('mongoose');
const fs = require('fs-extra'); // Используем fs-extra для работы с файлами
const path = require('path');

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/myshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Определение модели Product
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: 'Описание отсутствует' },
    price: { type: Number, default: 0 },
    image: { type: String, required: true },
    category: { type: String, default: 'Без категории' }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Путь к папке с изображениями
const imagesDir = 'C:/Users/Xasdan/Desktop/Penss/vue-project/public/images/metal/Ручка KOSKO FROST'; // Замените 'images' на вашу директорию

// Функция для создания товаров
async function createProductsFromImages() {
    try {
        // Проверяем, существует ли директория
        if (!(await fs.pathExists(imagesDir))) {
            console.error('Директория с изображениями не найдена.');
            return;
        }

        // Читаем содержимое директории
        const files = await fs.readdir(imagesDir);

        // Фильтруем только PNG файлы
        const pngFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');

        // Создаем массив товаров
        const products = pngFiles.map(file => {
            const fileName = path.basename(file, '.png'); // Удаляем расширение .png
            return {
                name: fileName, // Название товара берется из имени файла
                image: `/images/${file}`, // Путь к изображению
            };
        });

        // Сохраняем товары в базу данных
        const createdProducts = await Product.insertMany(products);
        console.log('Товары успешно созданы:', createdProducts);
    } catch (error) {
        console.error('Ошибка при создании товаров:', error);
    } finally {
        // Закрываем соединение с базой данных
        mongoose.connection.close();
    }
}

// Вызов функции
createProductsFromImages();