<!-- src/components/Cart.vue -->
<template>
  <div>
    <h2>Корзина</h2>
    <ul v-if="cartItems.length > 0">
      <li v-for="item in cartItems" :key="item.product._id">
        {{ item.product.name }} - ${{ item.product.price }} x {{ item.quantity }}
        <button @click="removeFromCart(item.product._id)">Удалить</button>
      </li>
    </ul>
    <p v-else>Корзина пуста</p>
    <p>Общая стоимость: ${{ totalPrice }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    },
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8080/api/cart', {
        withCredentials: true
      });
      this.cartItems = response.data.items || [];
    } catch (error) {
      console.error('Ошибка при загрузке корзины:', error);
    }
  },
  methods: {
    async removeFromCart(productId) {
      try {
        await axios.delete(`http://localhost:8080/api/cart/remove/${productId}`, {
          withCredentials: true
        });
        this.cartItems = this.cartItems.filter(item => item.product._id !== productId);
        alert('Товар удален из корзины!');
      } catch (error) {
        console.error('Ошибка при удалении товара:', error);
      }
    },
  },
};
</script>
<!-- Стили остаются без изменений -->
<style scoped>
.cart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.cart-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.product-details {
  flex-grow: 1;
  margin-left: 15px;
}

.product-name {
  font-size: 18px;
  margin: 0 0 5px 0;
}

.product-price {
  font-size: 16px;
  color: #555;
  margin: 0 0 5px 0;
}

.product-quantity {
  font-size: 14px;
  color: #777;
  margin: 0;
}

.remove-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #c0392b;
}

.empty-cart {
  text-align: center;
  font-size: 18px;
  color: #777;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}

.total-price {
  color: #2ecc71;
}
</style><style scoped>
.cart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.cart-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.product-details {
  flex-grow: 1;
  margin-left: 15px;
}

.product-name {
  font-size: 18px;
  margin: 0 0 5px 0;
}

.product-price {
  font-size: 16px;
  color: #555;
  margin: 0 0 5px 0;
}

.product-quantity {
  font-size: 14px;
  color: #777;
  margin: 0;
}

.remove-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #c0392b;
}

.empty-cart {
  text-align: center;
  font-size: 18px;
  color: #777;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}

.total-price {
  color: #2ecc71;
}
</style>