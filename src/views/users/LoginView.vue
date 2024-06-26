<template>
    <!-- component -->
    <div class="min-h-screen flex items-center justify-center w-full">
        <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
            <h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-200">Bienvenido de Nuevo!</h1>
            <form @submit.prevent="login">
                <div class="mb-4">
                    <label for="email"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Usuario</label>
                    <input type="email" id="email"
                        class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="tu@email.com" required v-model="user.email">
                </div>
                <div class="mb-4">
                    <label for="password"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contraseña</label>
                    <input type="password" id="password"
                        class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ingresa tu Contraseña" required v-model="user.pass">
                    <a href="#"
                        class="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Olvidaste
                        tu Contraseña?</a>
                </div>
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                        <input type="checkbox" id="remember"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                            checked>
                        <label for="remember"
                            class="ml-2 block text-sm text-gray-700 dark:text-gray-300">Recuerdame</label>
                    </div>
                    <a href="#"
                        class="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Registrate</a>
                </div>
                <button type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Iniciar
                    Sesion</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';

const user = reactive({ email: 'prueba1@bluuweb.cl', pass: '@Edwin123' });
const mensaje = ref('');
const store = useStore();
const router = useRouter();

const login = async () => {
    try {
        const res = await axios.post('/login', user);
        if (res.data && res.data.token) {
            const token = res.data.token;

            await store.dispatch('saveUser', token);
            router.push({ name: 'home' }); // Navigate to desired path after login
        } else {
            throw new Error('Token no encontrado en la respuesta del servidor');
        }
    } catch (err) {
        console.error(err);
        mensaje.value = err.response?.data?.mensaje || 'Error en la solicitud de login';
    }
};
</script>