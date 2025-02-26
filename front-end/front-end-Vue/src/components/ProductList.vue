<!-- src/components/ProductList.vue -->
<template>
  <div class="product-list-container">
    <header class="site-header">
      <div class="inner-header">
        <div class="product-list-title">
        </div>

        <nav class="header-right">
          <router-link to="/cart" class="header-button">Корзина</router-link>
          <router-link to="/auth" class="header-button">Вход/Регистрация</router-link>
          <div class="search-bar">
            <input type="text" v-model="searchQuery" placeholder="Поиск..." />
            <button @click="performSearch" class="search-button">Найти</button>
          </div>
        </nav>
      </div>
    </header>

    <div class="type-list">
      <div v-for="(products, type) in groupedProducts" :key="type" class="type-section">
        <h2 class="type-name">{{ type }}</h2>
        <div class="product-grid">
          <div
            v-for="product in products"
            :key="product._id"
            class="product-card"
            @mouseover="hoveredProductId = product._id"  
            @mouseleave="hoveredProductId = null"       
          >
            <router-link :to="`/product/${product._id}`" class="product-link">
              <img :src="product.image" :alt="product.name" class="product-image" />
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-price">ЦЕНА: ${{ product.price }}</p>
            </router-link>
            <div class="info" v-show="hoveredProductId === product._id">
              <p><strong>Описание:</strong> {{ product.description }}</p>
              <button @click="addToCart(product._id)" class="add-to-cart-button">В корзину</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="Object.keys(groupedProducts).length === 0" class="no-products">
      Нет товаров в каталоге.
    </div>
  </div>
</template>

<!-- src/components/ProductList.vue -->
<!-- Шаблон остаётся тем же, обновлю только <script> -->
<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      searchQuery: '',
      hoveredProductId: null,
    };
  },
  computed: {
    groupedProducts() {
      if (!Array.isArray(this.products)) return {};
      return this.products.reduce((groups, product) => {
        const type = product.type;
        if (!groups[type]) groups[type] = [];
        groups[type].push(product);
        return groups;
      }, {});
    },
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      this.products = Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);
      this.products = [];
    }
  },
  methods: {
    performSearch() {
      console.log('Поиск по запросу:', this.searchQuery);
    },
    async addToCart(productId) {
      try {
        await axios.post(`http://localhost:8080/api/cart/add/${productId}`, {}, {
          withCredentials: true
        });
        alert('Товар добавлен в корзину!');
      } catch (error) {
        if (error.response?.status === 401) {
          alert('Пожалуйста, войдите в систему.');
          this.$router.push('/login');
        } else {
          alert(error.response?.data.message || 'Ошибка при добавлении в корзину');
        }
      }
    },
  },
};
</script>

<style scoped>
/* Existing styles from before... */
.product-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.product-list-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.product-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  position: relative; /* Add this for absolute positioning of .info */
}


.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-name {
  font-size: 16px;
  margin: 0 0 5px 0;
  height: 2.4em; /* Limit to 2 lines of text (approx) */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Number of lines to show */
  -webkit-box-orient: vertical;
}

.product-price {
  font-size: 18px;
  color: #2c3e50;
  font-weight: bold;
}

/* Hover info styles */
.info {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black */
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  opacity: 0; /* Initially hidden */
  transition: opacity 0.3s ease;
  padding: 10px;
  box-sizing: border-box; /* Include padding in width/height */
   pointer-events: none; /* VERY IMPORTANT */
}
.product-card:hover .info {
    opacity: 1;
    pointer-events: auto; /* Re-enable pointer events on hover */
}

.add-to-cart-button {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  margin-top: 10px; /* Add some spacing */
}

.add-to-cart-button:hover {
  background-color: #2980b9;
}

.view-cart-button {
  display: inline-block;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}
.header-button{
    border: none;
    background: none;
    color: black;
    font-size: large;
    cursor: pointer;
}
.view-cart-button:hover {
  background-color: #16a085;
}

.action-buttons {
  text-align: center;
  margin-top: 20px;
}
.type-list {
  display: flex;
  flex-direction: column; /* Types in a column */
}

.type-section {
  margin-bottom: 20px; /* Space between type sections */
}

.type-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left; /* Align type names to the left */
  padding-left: 10px;
}
/* New styles for responsiveness */
@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Smaller cards on smaller screens */
  }

    .search-bar {
        display: flex;
        width: 100%; /* Full width on small screens */
        margin-bottom: 10px; /* Add some space below the search bar*/
    }

    .search-button {
      margin-left: 4px;
    }

  .product-image {
    height: 120px; /* Adjust image height for smaller cards */
  }
  .header-right{
    flex-direction: column;
  }
}
</style>