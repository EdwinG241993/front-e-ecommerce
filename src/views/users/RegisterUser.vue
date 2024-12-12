<template>
    <div class="relative sm:max-w-sm w-full">
        <div class="relative w-full rounded-3xl px-4 py-3 bg-gray-100 shadow-md">
            <div class="flex justify-end">
                <button @click="$emit('close')" class="text-gray-500 hover:text-gray-800">
                    x
                </button>
            </div>
            <label for="" class="block mt-2 text-sm text-gray-700 text-center font-semibold">
                Registrate
            </label>
            <form @submit.prevent="addUser(user)" class="mt-6">

                <div>
                    <input type="text" placeholder="Nombres" v-model="user.nombre"
                        class="mt-1 block w-full border-none bg-gray-100 h-10 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                    <small v-if="validationErrors.nombre" class="text-red-500 text-xs italic">
                        {{ validationErrors.nombre }}
                    </small>
                </div>

                <div class="mt-4">
                    <input type="text" placeholder="Correo electrónico" v-model="user.email"
                        class="mt-1 block w-full border-none bg-gray-100 h-10 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                    <small v-if="validationErrors.email" class="text-red-500 text-xs italic">
                        {{ validationErrors.email }}
                    </small>
                </div>

                <div class="mt-4">
                    <input type="password" placeholder="Contraseña" v-model="user.pass"
                        class="mt-1 block w-full border-none bg-gray-100 h-10 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                    <small v-if="validationErrors.pass" class="text-red-500 text-xs italic">
                        {{ validationErrors.pass }}
                    </small>
                </div>

                <div class="mt-4">
                    <input type="password" placeholder="Confirmar contraseña" v-model="user.pass"
                        class="mt-1 block w-full border-none bg-gray-100 h-10 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                </div>

                <div class="mt-5">
                    <button type="submit"
                        class="bg-blue-500 w-full py-2 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-300 ease-in-out transform hover:scale-105">
                        Registrar
                    </button>
                </div>

                <div class="mt-5">
                    <div class="flex justify-center items-center">
                        <label class="mr-2 text-sm">¿Ya tienes una cuenta?</label>
                        <a href="#"
                            class="text-blue-500 text-sm transition duration-300 ease-in-out transform hover:scale-105">
                            Iniciar sesión
                        </a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { inject, reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const user = reactive({
    nombre: '',
    email: '',
    pass: ''
});

const validationErrors = reactive({});
const generalError = ref('');
const router = useRouter();

const addUser = () => {
    console.log('Datos usuario', user);

    // Limpiar errores previos
    Object.keys(validationErrors).forEach(key => validationErrors[key] = '');
    generalError.value = '';

    // Enviar los datos como un objeto JSON
    axios.post('new-user', {
        nombre: user.nombre,
        email: user.email,
        pass: user.pass
    })
        .then(res => {
            console.log('Registrado');
            window.location.reload();
        })
        .catch(e => {
            if (e.response && e.response.data) {
                validationErrors.pass = e.response.data.mensaje;
            }
            //console.log(validationErrors);
            if (e.response && e.response.data && e.response.data.errors) {
                // Asignar errores de validación al objeto de errores
                Object.assign(validationErrors, e.response.data.errors);
                generalError.value = e.response.data.mensaje || 'Errores de validación';
                console.log('console.log(e.response)', validationErrors);
            } else {
                generalError.value = 'Error al agregar el usuario';
            }
        });
};

</script>
