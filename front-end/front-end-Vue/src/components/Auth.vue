<!-- src/components/Auth.vue -->
<template>
    <div>
      <h2>Регистрация</h2>
      <form @submit.prevent="register">
        <input v-model="registerForm.name" placeholder="Имя" />
        <input v-model="registerForm.email" placeholder="Email" />
        <input v-model="registerForm.password" type="password" placeholder="Пароль" />
        <button type="submit">Зарегистрироваться</button>
      </form>
  
      <h2>Вход</h2>
      <form @submit.prevent="login">
        <input v-model="loginForm.email" placeholder="Email" />
        <input v-model="loginForm.password" type="password" placeholder="Пароль" />
        <button type="submit">Войти</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        registerForm: { name: '', email: '', password: '' },
        loginForm: { email: '', password: '' },
      };
    },
    methods: {
      async register() {
        try {
          await axios.post('http://localhost:8080/api/auth/register', this.registerForm);
          alert('Вы успешно зарегистрированы!');
        } catch (error) {
          console.error('Ошибка регистрации:', error.response.data.message);
        }
      },
      async login() {
        try {
          const response = await axios.post('http://localhost:8080/api/auth/login', this.loginForm);
          localStorage.setItem('token', response.data.token); // Сохраняем токен в localStorage
          alert('Вы успешно вошли в систему!');
        } catch (error) {
          console.error('Ошибка входа:', error.response.data.message);
        }
      },
    },
  };
  </script>