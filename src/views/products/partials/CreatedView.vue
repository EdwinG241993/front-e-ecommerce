<template>
    <form @submit.prevent="addProduct(product)" class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-center text-lg font-semibold mb-4">Agregar nuevo producto</h3>

        <!-- Codigo -->
        <div class="relative z-0 w-full mb-5 group">
            <input type="text" id="codigo" placeholder=" "
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                v-model="product.codigo">
            <label for="codigo"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Codigo</label>
            <small v-if="validationErrors.codigo" class="text-red-500 text-xs italic">
                {{ validationErrors.codigo }}
            </small>
        </div>

        <!-- Nombre -->
        <div class="relative z-0 w-full mb-5 group">
            <input type="text" id="nombre" placeholder=" "
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                v-model="product.nombre">
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
                v-model="product.precio">
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
                v-model="product.categoria">
            <label for="categoria"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Categoria</label>
            <small v-if="validationErrors.categoria" class="text-red-500 text-xs italic">
                {{ validationErrors.categoria }}
            </small>
        </div>

        <!-- Stock -->
        <div class="relative z-0 w-full mb-5 group">
            <input type="number" id="stock" placeholder=" "
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                v-model="product.stock">
            <label for="stock"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Stock</label>
            <small v-if="validationErrors.stock" class="text-red-500 text-xs italic">
                {{ validationErrors.stock }}
            </small>
        </div>

        <!-- Fotos -->
        <div class="relative z-0 w-full mb-5 group">
            <input type="file" multiple
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                @change="handleFileUpload" accept="image/*">
            <label for="fotos"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fotos</label>
            <small v-if="product.fotos.length > 4" class="text-red-500 text-xs italic">
                Solo se pueden subir un máximo de 4 fotos.
            </small>
            <small v-if="product.fotos.length > 0" class="my-2">
                <ul class="list-disc list-inside text-sm">
                    <li v-for="(foto, index) in product.fotos" :key="index" class="flex justify-between items-center">
                        {{ foto.name }}
                        <button type="button" @click="removePhoto(index)"
                            class="text-red-500 hover:underline">Eliminar</button>
                    </li>
                </ul>
            </small>
        </div>

        <!-- Botones -->
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <button
                    class="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit">Agregar</button>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <button
                    class="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    type="button" @click="cancelCreate">Cancelar</button>
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref, reactive, defineEmits } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useStore } from 'vuex';

// Definition of issued events
const emit = defineEmits(['cancel-create', 'product-updated']);

const product = reactive({
    codigo: '',
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    fotos: []
});

// Reactive variables
const products = ref([]);
const productUpdate = reactive({});
const validationErrors = reactive({});
const generalError = ref('');
const store = useStore();
const token = store.state.token;

const handleFileUpload = (event) => {
    product.fotos = Array.from(event.target.files);
};

const addProduct = () => {
    Object.keys(validationErrors).forEach(key => validationErrors[key] = '');  // Limpiar errores previos
    generalError.value = '';
    if (product.fotos.length > 4) {
        return;
    }

    const formData = new FormData();
    formData.append('codigo', product.codigo);
    formData.append('nombre', product.nombre);
    formData.append('precio', product.precio);
    formData.append('stock', product.stock);
    formData.append('categoria', product.categoria);
    for (let i = 0; i < product.fotos.length; i++) {
        formData.append('fotos', product.fotos[i]);
    }

    axios.post('new-product', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            token: `${token}`
        }
    }).then(res => {
        // Add to the start of our array products
        products.value.unshift(res.data);
        emit('product-created');
        Swal.fire(
            'Creado!',
            'El producto ha sido creado.',
            'success'
        );
        product.codigo = '';
        product.nombre = '';
        product.precio = '';
        product.stock = '';
        product.categoria = '';
        product.fotos = [];
    })
        .catch(e => {
            if (e.response && e.response.data && e.response.data.errors) {
                Object.assign(validationErrors, e.response.data.errors);
                generalError.value = e.response.data.mensaje || 'Errores de validación';
            } else {
                generalError.value = 'Error al agregar el producto';
            }
        });
};

const removePhoto = (index) => {
    product.fotos.splice(index, 1);
};

const cancelCreate = () => {
    emit('cancel-create');
};
</script>