<template>

  <!-- Navbar -->
  <nav class="bg-gray-100 dark:bg-gray-700 dark:text-gray-400 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/"><img alt="Vue logo" src="./assets/logo.png" class="size-16"></router-link>
      <div>
        <router-link to="/" class="text-zinc-50 hover:text-zinc-400 mx-2">Inicio</router-link>
        <router-link to="/products" class="text-zinc-50 hover:text-zinc-400 mx-2">Productos</router-link>
      </div>
      <div>
        <router-link to="/" class="text-zinc-50 hover:text-zinc-400 mx-2">Login</router-link>
        <router-link to="/" class="text-green-700  hover:text-blue-700 mx-2"><i
            class="fas fa-shopping-cart">Carrito</i></router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
