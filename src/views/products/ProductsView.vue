<template>
  <div class="product p-6 m-4 rounded-lg shadow-md bg-gray-50">
    <CreateView v-if="viewCreate" @cancel-create="handleCancelCreate" @product-created="handleProductCreated"
      class="mb-4" />
    <UpdateView v-if="viewUpdate" @cancel-update="handleCancelUpdate" @product-updated="handleProductUpdated"
      :id="selectedProductId" class="mb-4" />
    <div class="flex items-center space-x-4 mb-4">
      <input v-if="!viewCreate" type="text" v-model="searchQuery" placeholder="Buscar..."
        class="w-full sm:w-auto px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
        @input="searchProducts">
      <label for="buscar" v-if="!viewCreate">Buscar</label>
      <button v-if="!viewCreate && !viewUpdate"
        class="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="activeCreate">Crear Producto</button>
    </div>
    <div class="relative overflow-x-auto bg-white rounded-lg shadow">
      <table class="w-full text-sm text-left rtl:text-right text-gray-700">
        <thead class="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Codigo</th>
            <th scope="col" class="px-6 py-3">Nombre</th>
            <th scope="col" class="px-6 py-3">Precio</th>
            <th scope="col" class="px-6 py-3">Categoria</th>
            <th scope="col" class="px-6 py-3">Activo</th>
            <th scope="col" class="px-6 py-3">Creado</th>
            <th scope="col" class="px-6 py-3">Fotos</th>
            <th scope="col" class="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id" class="border-b dark:border-gray-700">
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-gray-950 dark:text-gray-800">{{
              product.codigo }}</td>
            <td class="px-6 py-4 text-gray-950 dark:text-gray-800">{{ product.precio }}</td>
            <td class="px-6 py-4 text-gray-950 dark:text-gray-800">{{ product.nombre }}</td>
            <td class="px-6 py-4 text-gray-950 dark:text-gray-800">{{ product.categoria }}</td>
            <td class="px-6 py-4 text-gray-950 dark:text-gray-800">{{ product.activo }}</td>
            <td class="px-6 py-4 text-gray-950 dark:text-gray-800">{{ formatDate(product.date) }}</td>
            <td class="px-6 py-4">
              <div v-for="foto in product.fotos" :key="foto" class="mb-2">
                <img :src="getFotoUrl(foto)" alt="Foto de producto" class="h-16 w-16 object-cover rounded-md">
              </div>
            </td>
            <td class="px-6 py-4 flex space-x-2">
              <button class="btn-warning btn-sm px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                @click="activeUpdate(product._id)">Actualizar</button>
              <button class="btn-danger btn-sm px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                @click="deleteProduct(product._id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import CreateView from '@/views/products/partials/CreatedView.vue';
import UpdateView from './partials/UpdateView.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const selectedProductId = ref(null);
const products = ref([]);
const viewUpdate = ref(false);
const viewCreate = ref(false);
const searchQuery = ref('');

const listProducts = () => {
  axios.get('/product')
    .then((response) => {
      products.value = response.data;
    })
    .catch((error) => {
      console.log('Error: ' + error);
    });
};

const deleteProduct = (id) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`product/${id}`)
        .then(res => {
          const index = products.value.findIndex(item => item._id === res.data._id);
          if (index !== -1) {
            products.value.splice(index, 1);
          }
          listProducts();
          Swal.fire(
            'Eliminado!',
            'El producto ha sido eliminado.',
            'success'
          )
        })
        .catch(e => {
          console.log(e.response);
          Swal.fire(
            'Error!',
            'Hubo un problema eliminando el producto.',
            'error'
          )
        });
    }
  });
};

const activeUpdate = (id) => {
  selectedProductId.value = id;
  viewCreate.value = false;
  viewUpdate.value = true;
};

const activeCreate = () => {
  viewUpdate.value = false;
  viewCreate.value = true;
};

const handleCancelUpdate = () => {
  viewUpdate.value = false;
};

const handleCancelCreate = () => {
  viewCreate.value = false;
};

const handleProductUpdated = () => {
  viewUpdate.value = false;
  listProducts();
};

const handleProductCreated = () => {
  listProducts();
};

const getFotoUrl = (foto) => {
  return `/uploads/${foto}`;
};

const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return products.value.filter(product =>
    product.codigo.toLowerCase().includes(query) ||
    product.nombre.toLowerCase().includes(query) ||
    product.precio.toString().includes(query) ||
    product.categoria.toLowerCase().includes(query) ||
    product.activo.toString().toLowerCase().includes(query)
  );
});

const formatDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString(undefined, options);
};

onMounted(() => {
  listProducts();
});
</script>