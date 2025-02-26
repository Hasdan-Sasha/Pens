<!-- src/components/Login.vue -->
<template>
    <div>
        <h2>Вход</h2>
        <form @submit.prevent="login">
            <input v-model="form.email" type="email" placeholder="Email" required />
            <input v-model="form.password" type="password" placeholder="Пароль" required />
            <button type="submit">Войти</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            form: { email: '', password: '' }
        };
    },
    methods: {
        async login() {
    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', this.form, {
            withCredentials: true
        });
        alert('Вы успешно вошли в систему!');

        try {
            this.$store.commit('setUser', response.data.user);
        } catch (storeError) {
            console.error('Ошибка в сторе:', storeError);
        }

        try {
            console.log('Current user state:', this.$store.state.user);
        } catch (logError) {
            console.error('Ошибка при логировании:', logError);
        }

        try {
            this.$router.push('/');
        } catch (routerError) {
            console.error('Ошибка в роутере:', routerError);
        }
    } catch (error) {
        alert(error.response?.data.message || 'Ошибка входа');
    }
}
    }
};
</script>