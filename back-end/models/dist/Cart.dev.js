"use strict";

// models/Cart.js
var mongoose = require('mongoose'); // Схема элемента корзины


var cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  // Ссылка на товар
  quantity: {
    type: Number,
    "default": 1,
    required: true
  } // Количество товара в корзине

}); // Схема корзины

var cartSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  // Пользователь, которому принадлежит корзина
  items: [cartItemSchema],
  // Массив элементов корзины
  totalQuantity: {
    type: Number,
    "default": 0
  },
  // Общее количество товаров в корзине
  totalPrice: {
    type: Number,
    "default": 0
  } // Общая стоимость товаров в корзине

}, {
  timestamps: true
}); // Middleware для обновления totalQuantity и totalPrice при сохранении корзины

cartSchema.pre('save', function (next) {
  var cart = this;
  cart.totalQuantity = cart.items.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);
  cart.totalPrice = cart.items.reduce(function (sum, item) {
    return sum + item.product.price * item.quantity;
  }, 0);
  next();
});
module.exports = mongoose.model('Cart', cartSchema);