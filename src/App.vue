<template>
  <!-- Navbar -->
  <nav class="bg-gray-100 dark:bg-gray-700 dark:text-gray-400 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/"><img alt="Vue logo" src="./assets/logo.png" class="size-16"></router-link>
      <div>
        <router-link to="/" class="text-zinc-50 hover:text-zinc-400 mx-2">Inicio</router-link>
        <router-link to="/products" v-if="stateActive && role === 'ADMIN'"
          class="text-zinc-50 hover:text-zinc-400 mx-2">Productos</router-link>
        <router-link to="/" v-if="stateActive && role === 'CLIENT'"
          class="text-zinc-50 hover:text-zinc-400 mx-2">Compras</router-link>
      </div>
      <div>
        <router-link to="/login" v-if="!stateActive" class="text-zinc-50 hover:text-zinc-400 mx-2">Login</router-link>
        <button @click="logout()" v-if="stateActive" class="text-zinc-50 hover:text-zinc-400 mx-2">Logout</button>
        <button @mouseenter="showCart" @mouseleave="hideCart" class="text-green-700 hover:text-blue-700 mx-2">
          <i class="fas fa-shopping-cart">Carrito</i>
        </button>
      </div>
    </div>
  </nav>
  <router-view />
  <Modal :show="isCartVisible" @mouseenter="showCart" @mouseleave="hideCart">
    <ShoppingCart />
  </Modal>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, onMounted, watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import Modal from './components/Modal.vue';
import ShoppingCart from './components/ShoppingCart.vue';

const store = useStore();
const router = useRouter();
const isCartVisible = ref(false);
const role = computed(() => store.state.role);
const stateActive = computed(() => store.getters.stateActive);

const logout = () => {
  store.dispatch('logout');
};

const readToken = () => {
  store.dispatch('readToken');
};

const showCart = () => {
  isCartVisible.value = true;
};

const hideCart = () => {
  isCartVisible.value = false;
};

const saveCartToLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(store.getters.cart));
};

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    store.dispatch('setCart', JSON.parse(savedCart));
  }
};

watch(stateActive, (newVal) => {
  if (!newVal) {
    router.push({ name: 'home' });
  }
});

// Observe the cart changes deeply to save them to localStorage
watch(
  () => store.getters.cart,
  (newCart) => {
    saveCartToLocalStorage();
  },
  { deep: true }
);

onMounted(() => {
  readToken();
  loadCartFromLocalStorage();
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.relative:hover .absolute {
  display: block;
}
</style>
