<template>
  <div class="home">

    <!-- Product Section -->
    <div class="container mx-auto mt-8">
      <div class="flex">
        <!-- Product Image -->
        <div class="w-1/2">
          <img src="https://via.placeholder.com/500" alt="Product Image" class="w-full">
        </div>
        <!-- Product Details -->
        <div class="w-1/2 pl-8">
          <h2 class="text-3xl font-bold">CHARGE SLR</h2>
          <h3 class="text-xl text-gray-700 mb-4">Nike SB</h3>
          <div class="flex items-center mb-4">
            <span class="text-blue-500 mr-2">★★★★★</span>
            <span class="text-gray-500">Gray Skate Shoe</span>
          </div>
          <p class="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco...
          </p>
          <div class="text-2xl font-bold mb-4">$15</div>
          <div class="flex items-center">
            <button class="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">Add to cart</button>
            <button class="border border-gray-300 px-4 py-2 rounded hover:bg-gray-200"><i
                class="fas fa-heart"></i></button>
          </div>
        </div>
      </div>

      <!-- Other Products Section -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold mb-4">Other products</h2>
        <div class="grid grid-cols-4 gap-4">
          <!-- Product Card -->
          <div v-for="product in products" :key="product.id" class="bg-white p-4 rounded-lg shadow-lg">
            <div id="controls-carousel" class="relative w-full" data-carousel="static">
              <!-- Carousel wrapper -->
              <div class="relative h-56 rounded-lg md:h-96">
                <!-- Item 1 -->
                <div v-for="foto in product.fotos" :key="foto" class="duration-700 ease-in-out" data-carousel-item>
                  <img :src="getFotoUrl(foto)"
                    class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                </div>
              </div>
              <!-- Slider controls -->
              <button type="button"
                class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev>
                <span
                  class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 1 1 5l4 4" />
                  </svg>
                  <span class="sr-only">Previous</span>
                </span>
              </button>
              <button type="button"
                class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next>
                <span
                  class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 9 4-4-4-4" />
                  </svg>
                  <span class="sr-only">Next</span>
                </span>
              </button>
            </div>
            <h3 class="text-lg font-bold">{{ product.nombre }}</h3>
            <div class="text-gray-700">{{ product.precio }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

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

onMounted(() => {
  listProducts();
});
</script>