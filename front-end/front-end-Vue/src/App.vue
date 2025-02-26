<!-- src/App.vue -->
<template>
  <div id="app">
    <header class="app-header">
      <div><router-link to="/cart" class="header-button">Корзина</router-link></div>
      <router-link to="/"><img src="/Logo.png" alt="Logo" class="logo"></router-link>
      <div>
        <router-link to="/login" class="header-button">Вход</router-link>
        <router-link to="/register" class="header-button">Регистрация</router-link>
      </div>
    </header>
    <main class="app-main">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
.logo {
  width: 20%;
}
.app-header {
  background-color: #ffffff;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 15px 20px;
}
.app-main {
  padding: 20px;
}
.header-button {
  color: black;
  text-decoration: none;
  margin: 0 10px;
}
</style>