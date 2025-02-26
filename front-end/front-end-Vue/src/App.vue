<!-- src/App.vue -->
<template>
  <div id="app">
    <header class="app-header">
      <div><router-link to="/cart" class="header-button">Корзина</router-link></div>
      <router-link to="/"><img src="C:/Users/Xasdan/Desktop/Pens/front-end/front-end-Vue/public/Logo.png" alt="" class="logo"></router-link>
      <div>
        <router-link to="/Auth" class="header-button"><div><p>Вход/Регистрация</p></div></router-link>
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
.logo{
  width: 20%;
}

.app-header {
  background-color: #ffffff;
  color: white;
  display: flex;
  justify-content:space-between;
  flex-direction: row;
  padding: 15px 20px;
}

.app-title {
  font-size: 24px;
  margin: 0;
}

.app-nav {
  margin-top: 10px;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin: 0 10px;
  font-size: 16px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ecf0f1;
}

.app-main {
  padding: 20px;
}
</style>