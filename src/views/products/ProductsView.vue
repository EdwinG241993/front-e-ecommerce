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
    <div class="overflow-x-auto">
      <table class="table-auto w-full text-sm text-left rtl:text-right text-gray-700">
        <thead class="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-2 py-3">Codigo</th>
            <th scope="col" class="px-2 py-3">Nombre</th>
            <th scope="col" class="px-2 py-3">Precio</th>
            <th scope="col" class="px-2 py-3">Stock</th>
            <th scope="col" class="px-2 py-3">Categoria</th>
            <th scope="col" class="px-2 py-3">Creado</th>
            <th scope="col" class="px-2 py-3">Fotos</th>
            <th scope="col" class="px-2 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id" class="border-b dark:border-gray-700">
            <td class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap text-gray-950 dark:text-gray-800">
              {{ product.codigo }}
            </td>
            <td class="px-2 py-4 text-gray-950 dark:text-gray-800">
              <div class="max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis px-2 text-left">{{
                product.nombre }}</div>
            </td>
            <td class="px-2 py-4 text-gray-950 dark:text-gray-800">${{
              product.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}</td>
            <td class="px-2 py-4 text-gray-950 dark:text-gray-800">{{ product.stock }}</td>
            <td class="px-2 py-4 text-gray-950 dark:text-gray-800">{{ product.categoria }}</td>
            <td class="px-2 py-4 text-gray-950 dark:text-gray-800">{{ formatDate(product.date) }}</td>
            <td class="px-2 py-2">
              <div class="mb-2">
                <img :src="getFotoUrl(product.fotos[0])" alt="Foto de producto"
                  class="h-10 w-10 object-cover rounded-md">
              </div>
            </td>
            <td class="px-2 py-4 flex flex-wrap space-x-1">
              <button @click="activeUpdate(product._id)" title="Editar"><svg class="h-6 w-6 text-green-600"
                  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                  <line x1="16" y1="5" x2="19" y2="8" />
                </svg></button>
              <button @click="deleteProduct(product._id)" title="Eliminar"><svg class="h-6 w-6 text-red-500"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg></button>
              <button v-if="product.activo" @click="updateProductState(product)" title="Inactivar"><svg
                  class="h-6 w-6 text-green-600" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 12l2 2l4 -4" />
                </svg></button>
              <button v-if="!product.activo" @click="updateProductState(product)" title="Activar"><svg
                  class="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg></button>
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
import { useStore } from 'vuex';
import Swal from 'sweetalert2';

const selectedProductId = ref(null);
const products = ref([]);
const viewUpdate = ref(false);
const viewCreate = ref(false);
const searchQuery = ref('');
const store = useStore();
const token = store.state.token;
const role = store.state.role;

const listProducts = () => {
  const config = {
    headers: {
      token: `${token}` // Pass token in the Authorization header
    }
  };
  axios.get('/product', config)
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
      axios.delete(`product/${id}`, {
        headers: {
          token: `${token}` // Pass token in the Authorization header
        }
      }).then(res => {
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
      }).catch(e => {
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

const updateProductState = (item) => {
  const activo = item.activo ? false : true;
  const data = { activo: activo };

  axios.patch(`product/${item._id}`, data, {
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`
    }
  }).then(res => {
    let timerInterval;
    if (data.activo) {
      Swal.fire({
        title: "Activando!",
        showConfirmButton: false,
        icon: "success",
        timer: 1500,
        willClose: () => {
          clearInterval(timerInterval);
        }
      });
    } else {
      Swal.fire({
        title: "Desactivando!",
        showConfirmButton: false,
        icon: "error",
        timer: 1500,
        willClose: () => {
          clearInterval(timerInterval);
        }
      });
    }
    listProducts();
  }).catch(e => {
    if (e.response && e.response.data && e.response.data.errors) {
      Object.assign(validationErrors, e.response.data.errors);
      generalError.value = e.response.data.mensaje || 'Errores de validación';
    } else {
      generalError.value = 'Error al actualizar el producto';
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
  return `/${foto}`;
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