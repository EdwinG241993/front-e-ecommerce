<template>
  <div class="home">
    <!-- Product Section -->
    <div class="container mx-auto mt-8">
      <div class="flex" v-if="products.length > 0">
        <!-- Product Image -->
        <div class="w-1/2">
          <img :src="getFotoUrl(products[0].fotos[0])" alt="Product Image" class="w-full">
        </div>
        <!-- Product Details -->
        <div class="w-1/2 pl-8">
          <h2 class="text-3xl font-bold">{{ products[0].nombre }}</h2>
          <h3 class="text-xl text-gray-700 mb-4">{{ products[0].categoria }}</h3>
          <div class="flex items-center mb-4">
            <span class="text-blue-500 mr-2">★★★★★</span>
            <span class="text-gray-500">Gray Skate Shoe</span>
          </div>
          <p class="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco...
          </p>
          <div class="text-2xl font-bold mb-4">${{ products[0].precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
            }}</div>
          <div class="flex items-center">
            <button @click="addToCart(products[0])"
              class="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">Agregar al carrito</button>
          </div>
        </div>
      </div>
      <!-- Other Products Section -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold mb-4">Otros Productos</h2>
        <div class="grid grid-cols-4 gap-4">
          <!-- Product Card -->
          <div v-for="product in products" :key="product.id" class="bg-white p-4 rounded-lg shadow-lg">
            <Slider :productPhotos="product.fotos" />
            <h3 class="text-base font-bold">{{ product.nombre }}</h3>
            <div class="text-gray-700">${{ product.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}</div>
            <button @click="addToCart(product)">Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import Slider from '@/components/Slider.vue';

const store = useStore();
const products = ref([]);

const listProducts = () => {
  axios.get('/product')
    .then((response) => {
      products.value = response.data;
    })
    .catch((error) => {
      console.log('Error: ' + error);
    });
};

const getFotoUrl = (foto) => {
  return `/${foto}`;
};

const addToCart = (product) => {
  store.dispatch('addToCart', product);
};

onMounted(() => {
  listProducts();
});
</script>
