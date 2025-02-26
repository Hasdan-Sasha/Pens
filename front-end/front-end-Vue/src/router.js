// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import ProductList from './components/ProductList.vue';
import ProductDetails from './components/ProductDetails.vue';
import Cart from './components/Cart.vue'; // Импортируем компонент корзины
import Auth from './components/Auth.vue';
const routes = [
    { path: '/', component: ProductList },
    { path: '/product/:id', component: ProductDetails },
    { path: '/cart', component: Cart, meta: { requiresAuth: true } }, // Добавляем маршрут для корзины
    { path:'/auth', component: Auth }

];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

export default router;