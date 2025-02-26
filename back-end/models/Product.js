// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }, // Категория товара
    type: { type: String, required: true } // Новое поле: Тип товара
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);