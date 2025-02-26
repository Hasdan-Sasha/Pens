<!-- src/components/Register.vue -->
<template>
    <div>
        <h2>Регистрация</h2>
        <form @submit.prevent="register">
            <input v-model="form.name" placeholder="Имя" required />
            <input v-model="form.email" type="email" placeholder="Email" required />
            <input v-model="form.password" type="password" placeholder="Пароль" required />
            <button type="submit">Зарегистрироваться</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            form: { name: '', email: '', password: '' }
        };
    },
    methods: {
        async register() {
            try {
                await axios.post('http://localhost:8080/api/auth/register', this.form);
                alert('Вы успешно зарегистрированы!');
                this.$router.push('/login');
            } catch (error) {
                alert(error.response?.data.message || 'Ошибка регистрации');
            }
        }
    }
};
</script>