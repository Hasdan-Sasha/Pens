// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import ProductList from './components/ProductList.vue';
import ProductDetails from './components/ProductDetails.vue';
import Cart from './components/Cart.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';

const routes = [
    { path: '/', component: ProductList },
    { path: '/product/:id', component: ProductDetails },
    { path: '/cart', component: Cart, meta: { requiresAuth: true } },
    { path: '/register', component: Register },
    { path: '/login', component: Login }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

// Защита маршрутов
router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/check-session', {
                withCredentials: true
            });
            if (response.data.authenticated) {
                next();
            } else {
                next('/login');
            }
        } catch {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;