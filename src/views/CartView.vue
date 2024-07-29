<template>
    <div class="container mx-auto px-4">
        <h1 class="text-2xl font-semibold mb-4">Carrito de Compras</h1>
        <div class="flex flex-col md:flex-row gap-4">
            <div class="md:w-3/4">
                <div class="bg-white rounded-lg shadow-md p-6 mb-4">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr>
                                    <th class="text-center md:text-left font-semibold">Producto</th>
                                    <th class="text-center font-semibold">Precio</th>
                                    <th class="text-center font-semibold">Cantidad</th>
                                    <th class="text-center md:text-right font-semibold">Total</th>
                                </tr>
                            </thead>
                            <tbody id="cart-items">
                                <tr v-for="item in cart" :key="item.id" class="pb-4 border-b border-gray-300">
                                    <td class="px-1 py-4">
                                        <div class="flex items-center flex-col sm:flex-row text-center sm:text-left">
                                            <img class="h-16 w-16 md:h-24 md:w-24 sm:mr-8 mb-4 sm:mb-0"
                                                :src="item.fotos[0]" alt="Product image">
                                            <p class="text-sm md:text-base md:font-semibold">{{ item.nombre }}</p>
                                        </div>
                                    </td>
                                    <td class="px-1 py-4 text-center">{{ item.nombre }}</td>
                                    <td class="px-1 py-4 text-center">
                                        <div class="flex items-center justify-center">
                                            <button @click="decrementCount(item)"
                                                class="bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full">-</button>
                                            <p class="quantity text-center w-8">{{ item.count }}</p>
                                            <button @click="incrementCount(item)"
                                                class="bg-green-500 text-white w-5 h-5 flex items-center justify-center rounded-full">+</button>
                                        </div>
                                    </td>
                                    <td class="px-1 py-4 text-right">${{ (item.precio * item.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}</td>
                                    <td class="px-1 py-4 text-right"><button @click="removeFromCart(item)">x</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="px-1 flex flex-col lg:flex-row justify-between items-center mt-10">
                            <div class="flex items-center">
                                <input type="text" placeholder="Coupon code"
                                    class="border border-gray-300 rounded-l-full py-2 px-4 focus:outline-none">
                                <button
                                    class="bg-blue-500 text-slate-50 border border-blue-500 hover:bg-transparent hover:text-slate-950 rounded-full py-2 px-4">Aplicar
                                    Cupon</button>
                            </div>
                            <div class="mt-4 lg:mt-0 flex space-x-2">
                                <button @click="emptyCart"
                                    class="bg-blue-500 text-slate-50 border border-blue-500 hover:bg-transparent hover:text-slate-950 rounded-full py-2 px-4">Vaciar
                                    Carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md:w-1/4">
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-lg font-semibold mb-4">Resumen</h2>
                    <div class="flex justify-between mb-4">
                        <p>Subtotal</p>
                        <p>${{ total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}</p>
                    </div>
                    <div class="flex justify-between mb-4">
                        <p>Impuestos</p>
                        <p>$1.99</p>
                    </div>
                    <div class="flex justify-between mb-4 pb-4 border-b border-gray-300">
                        <p>Costo Envio</p>
                        <p>$0.00</p>
                    </div>
                    <div class="flex justify-between mb-2">
                        <p class="font-semibold">Total</p>
                        <p class="font-semibold">${{ Math.round(total + (total * 0.0199)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}</p>
                    </div>
                    <a href="/checkout"
                        class="bg-blue-500 text-slate-50 border border-blue-500 hover:bg-transparent hover:text-slate-950 rounded-full py-2 px-4">Pago</a>
                </div>
            </div>
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
    cartWithCount.value = updateCartWithCount(newCart);
}, { immediate: true });

const total = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.precio * item.count, 0);
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

const emptyCart = () => {
    store.dispatch('emptyCart');
};
</script>