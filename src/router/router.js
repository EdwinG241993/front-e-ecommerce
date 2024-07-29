import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import store from '../store/store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/users/LoginView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/CartView.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import(/* webpackChunkName: "product" */ '../views/products/ProductsView.vue'),
    meta: { requireAuth: true, requireRol: 'ADMIN' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some(record => record.meta.requireAuth);
  const rolNecesario = to.meta.requireRol;
  const usuarioRol = store.state.role;

  if (rutaProtegida && rolNecesario && usuarioRol !== rolNecesario) {
    next({ name: 'home' }); // Redirect to the home page or to an access-denied page
  } else {
    next();
  }
});

export default router
