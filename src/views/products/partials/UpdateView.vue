<template>
    <form @submit.prevent="updateProduct(productUpdate)" class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-center text-lg font-semibold mb-4">Editar Producto</h3>

        <small v-if="generalError" class="text-red-500 text-sm mb-2 block">
            {{ generalError }}
        </small>

        <!-- Nombre -->
        <div class="relative z-0 w-full mb-5 group">
            <input type="text" id="nombre" placeholder=" "
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                v-model="productUpdate.nombre">
            <label for="nombre"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
            <small v-if="validationErrors.nombre" class="text-red-500 text-xs italic">
                {{ validationErrors.nombre }}
            </small>
        </div>

        <!-- Precio -->
        <div class="relative z-0 w-full mb-5 group">
            <input type="number" id="precio" placeholder=" "
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                v-model="productUpdate.precio">
            <label for="precio"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Precio</label>
            <small v-if="validationErrors.precio" class="text-red-500 text-xs italic">
                {{ validationErrors.precio }}
            </small>
        </div>

        <!-- Categoria -->
        <div class="relative z-0 w-full mb-5 group">
            <input type="text" id="categoria" placeholder=" "
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                v-model="productUpdate.categoria">
            <label for="categoria"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Categoria</label>
            <small v-if="validationErrors.categoria" class="text-red-500 text-xs italic">
                {{ validationErrors.categoria }}
            </small>
        </div>

        <!-- Botones -->
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <button
                    class="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit">Editar</button>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <button
                    class="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    type="button" @click="cancelUpdate">Cancelar</button>
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref, reactive, onMounted, defineEmits, defineProps } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useStore } from 'vuex';

// Properties definition
const props = defineProps({
    id: String
});

// Definition of issued events
const emit = defineEmits(['cancel-update', 'product-updated']);

// Reactive variables
const productUpdate = reactive({});
const validationErrors = reactive({});
const generalError = ref('');
const store = useStore();
const token = store.state.token;

const findId = (id) => {
    axios.get(`product/${id}`)
        .then(res => {
            Object.assign(productUpdate, res.data);
        })
        .catch(e => {
            console.log(e.response);
        });
};

const updateProduct = (item) => {
    Object.keys(validationErrors).forEach(key => validationErrors[key] = '');  // Limpiar errores previos
    generalError.value = '';
    axios.put(`product/${item._id}`, item, {
        headers: {
            'Content-Type': 'multipart/form-data',
            token: `${token}`
        }
    }).then(res => {
        emit('product-updated');
        Swal.fire(
            'Actualizado!',
            'El producto ha sido actualizado.',
            'success'
        );
    }).catch(e => {
        if (e.response && e.response.data && e.response.data.errors) {
            Object.assign(validationErrors, e.response.data.errors);
            generalError.value = e.response.data.mensaje || 'Errores de validación';
        } else {
            generalError.value = 'Error al actualizar el producto';
        }
    });
};

const cancelUpdate = () => {
    emit('cancel-update');
};

onMounted(() => {
    if (props.id) {
        findId(props.id);
    }
});
</script>
