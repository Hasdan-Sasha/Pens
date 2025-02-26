<!-- src/components/ProductDetails.vue -->
<template>
  <div v-if="product">
    <h2>{{ product.name }}</h2>
    <p><strong>Описание:</strong> {{ product.description }}</p>
    <p><strong>Цена:</strong> ${{ product.price }}</p>
    <img :src="product.image" :alt="product.name" style="max-width: 300px;" />
  </div>
  <div v-else>
    <p>Загрузка...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: null
    };
  },
  async created() {
    const productId = this.$route.params.id;
    try {
      const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
      this.product = response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }
};
</script>
<style scoped>
.product-details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.product-title {
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.product-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.product-description {
  flex-grow: 1;
}

.add-to-cart-button {
  background-color: #e67e22;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.add-to-cart-button:hover {
  background-color: #d35400;
}
</style>