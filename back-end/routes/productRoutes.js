// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Получение всех товаров



router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Получение одного товара по ID
router.get('/:id', getProduct, (req, res) => {
    res.json(res.product);
});

// Создание нового товара
router.post('/', async (req, res) => {
    const { name, description, price, image, category } = req.body;

    const product = new Product({ name, description, price, image, category });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Обновление товара
router.put('/:id', getProduct, async (req, res) => {
    const { name, description, price, image, category } = req.body;

    if (name !== undefined) res.product.name = name;
    if (description !== undefined) res.product.description = description;
    if (price !== undefined) res.product.price = price;
    if (image !== undefined) res.product.image = image;
    if (category !== undefined) res.product.category = category;

    try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Удаление товара
router.delete('/:id', getProduct, async (req, res) => {
    try {
        await res.product.remove();
        res.json({ message: 'Deleted Product' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware для получения товара по ID
async function getProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Cannot find product' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.product = product;
    next();
}

module.exports = router;