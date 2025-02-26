// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Предполагается, что модель корзины уже создана
const Product = require('../models/Product');
const authenticateToken = require('../middleware/authMiddleware');

// Получение корзины пользователя по ID пользователя
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Добавление товара в корзину
// routes/cartRoutes.js
router.post('/:userId/add/:productId', authenticateToken, async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;



    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex >= 0) {
            cart.items[itemIndex].quantity += 1; // Увеличить количество, если товар уже есть
        } else {
            cart.items.push({ product: productId, quantity: 1} ); // Добавить новый товар
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error('Error adding product to cart:', err.message, err.stack); // Подробное логирование
        res.status(500).json({ message: 'Failed to add product to cart' });
    }
});

// Обновление количества товара в корзине
router.put('/:userId/update/:productId', authenticateToken, async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const { quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex < 0) return res.status(404).json({ message: 'Product not in cart' });

        cart.items[itemIndex].quantity = quantity > 0 ? quantity : 0;
        if (cart.items[itemIndex].quantity === 0) {
            cart.items.splice(itemIndex, 1);
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Удаление товара из корзины
router.delete('/:userId/remove/:productId', authenticateToken, async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex < 0) return res.status(404).json({ message: 'Product not in cart' });

        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Очистка корзины
router.delete('/:userId/clear', authenticateToken, async (req, res) => {
    const userId = req.params.userId;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = [];
        await cart.save();
        res.json({ message: 'Cart cleared' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;