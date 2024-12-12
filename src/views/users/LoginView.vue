<template>
    <!-- component -->
    <div
        class="mt-2 w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md border-solid border-2 border-zinc-500">
        <div class="px-6 py-4">
            <div class="flex justify-center mx-auto">
                <img class="w-auto h-7 sm:h-8" src="../../assets/logo.png" alt="">
            </div>

            <h3 class="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-900">Bienvenido de nuevo</h3>

            <p class="mt-1 text-center text-gray-500 dark:text-gray-900">Inicia sesion o crea una cuenta</p>

            <form @submit.prevent="login">
                <div class="w-full mt-4">
                    <input
                        class="block w-full px-4 py-2 mt-2 text-gray-950 placeholder-gray-500 bg-white border rounded-lg dark:border-gray-600 dark:placeholder-gray-400 focus:border-gray-400 dark:focus:border-gray-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-gray-300"
                        type="email" placeholder="tu-email@example.com" aria-label="Email Address"
                        v-model="user.email" />
                </div>

                <div class="w-full mt-4">
                    <input
                        class="block w-full px-4 py-2 mt-2 text-gray-950 placeholder-gray-500 bg-white border rounded-lg dark:border-gray-600 dark:placeholder-gray-400 focus:border-gray-400 dark:focus:border-gray-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-gray-300"
                        type="password" placeholder="Contraseña" aria-label="Password" v-model="user.pass" />
                </div>

                <div class="flex items-center justify-between mt-4">
                    <a href="#" class="text-sm text-gray-500 dark:text-gray-900 hover:text-gray-500">Olvidaste la
                        contraseña?</a>

                    <button type="submit"
                        class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Iniciar Sesion
                    </button>
                </div>
            </form>
        </div>

        <div class="flex items-center justify-center py-4 text-center bg-gray-50">
            <span class="text-sm text-gray-500 dark:text-gray-900">No tienes cuenta? </span>

            <button type="button" @click="showCart"
                class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Registrarse</button>
        </div>
    </div>
    <Modal :show="isCartVisible">
        <div class="fixed inset-0 flex items-center justify-center z-50">
            <RegisterUser @close="hideCart" />
        </div>
    </Modal>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Modal from '../../components/Modal.vue';
import RegisterUser from './RegisterUser.vue';

const user = reactive({ email: 'prueba1@bluuweb.cl' });
const mensaje = ref('');
const store = useStore();
const router = useRouter();
const isCartVisible = ref(false);

const showCart = () => {
    isCartVisible.value = true;
};

const hideCart = () => {
    isCartVisible.value = false;
};

const login = async () => {
    try {
        const res = await axios.post('/login', user, {
            withCredentials: true // Enable sending cookies
        });
        if (res.data && res.data.token) {
            const token = res.data.token;

            await store.dispatch('saveUser', token);
            router.push({ name: 'home' }); // Navigate to desired path after login
        } else {
            throw new Error('Token no encontrado en la respuesta del servidor');
        }
    } catch (err) {
        mensaje.value = err.response?.data?.mensaje || 'Error en la solicitud de login';
    }
};

</script>
