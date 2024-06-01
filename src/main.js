import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './index.css';

const app = createApp(App);

// configure Axios
axios.defaults.baseURL = 'http://localhost:3000/api';

// Use modules
app.use(store);
app.use(router);
app.use(VueAxios, axios);

// Mount App
app.mount('#app');



