<template>
  <div @mouseenter="showCart" @mouseleave="hideCart">
    <!-- Cart dropdown -->
    <div class="absolute right-0 mt-1 w-80 bg-white shadow-lg p-4 rounded-md">
      <div class="space-y-4">
        <!-- product item -->
        <div v-for="item in cart" :key="item.id"
          class="flex items-center justify-between pb-4 border-b border-gray-300">
          <div class="flex items-center">
            <img :src="item.fotos[0]" alt="Product" class="h-12 w-12 object-cover rounded mr-2">
            <div>
              <p class="text-sm font-semibold text-gray-900">{{ item.nombre.slice(0, item.nombre.indexOf(' ',
                item.nombre.indexOf(' ') + 1)) }}</p>
              <div class="flex space-x-2">
                <button @click="decrementCount(item)"
                  class="bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full">-</button>
                <p class="text-sm text-gray-600"><small>Cantidad: {{ item.count }}</small></p>
                <button @click="incrementCount(item)"
                  class="bg-green-500 text-white w-5 h-5 flex items-center justify-center rounded-full">+</button>
              </div>
            </div>
          </div>
          <p class="font-semibold text-gray-800">${{ (item.precio *
            item.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}</p>
          <button @click="removeFromCart(item)">x</button>
        </div>
      </div>
      <router-link to="/cart"
        class="block bg-blue-500 text-slate-50 border border-blue-500 hover:bg-transparent hover:text-slate-950 rounded-full mt-1 py-2 px-2">Ir
        al carrito</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, inject, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const cartWithCount = ref([]);

const cart = computed(() => store.getters.cart);
const showCart = inject('showCart');
const hideCart = inject('hideCart');

// Add and update the count field on each cart item
const updateCartWithCount = (newCart) => {
  const itemCountMap = new Map();

  // Count occurrences of each item
  newCart.forEach(item => {
    if (!itemCountMap.has(item._id)) {
      itemCountMap.set(item._id, { ...item, count: 0 });
    }
    itemCountMap.get(item._id).count += 1;
  });

  // Convert to array
  return Array.from(itemCountMap.values());
};

// Watcher to update cartWithCount when cart changes
watch(cart, (newCart) => {
  if (cart.value.length == 0) {
  }
  cartWithCount.value = updateCartWithCount(newCart);
}, { immediate: true });

const total = computed(() => {
  return cartWithCount.value.reduce((sum, item) => sum + item.price * item.count, 0);
});

const incrementCount = (item) => {
  store.dispatch('addToCart', item);
};

const decrementCount = (item) => {
  store.dispatch('removeFromCart', item);
};

const removeFromCart = (item) => {
  store.dispatch('removeFromCartItem', item);
};
</script>