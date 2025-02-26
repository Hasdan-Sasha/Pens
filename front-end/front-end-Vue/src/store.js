// src/store.js
import { createStore } from 'vuex';

export default createStore({
    state: {
        user: null // Здесь будут храниться данные пользователя
    },
    mutations: {
        setUser(state, user) {
            state.user = user; // Функция для обновления данных пользователя
        }
    },
    actions: {
        // Можно добавить асинхронные операции, если нужно
    },
    getters: {
        getUser: state => state.user // Функция для получения данных пользователя
    }
});