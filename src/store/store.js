import { createStore } from 'vuex';
import { jwtDecode } from 'jwt-decode';

const store = createStore({
  state() {
    return {
      token: '',
      role: '',
      usuarioDB: '',
      cart: []
    };
  },
  mutations: {
    GET_USER(state, payload) {
      state.token = payload;
      if (payload === '') {
        state.usuarioDB = '';
      } else {
        state.usuarioDB = jwtDecode(payload);
        state.role = state.usuarioDB.data.role;
      }
    },
    ADD_TO_CART(state, product) {
      const item = state.cart.find(item => item._id === product._id);
      console.log("En el store item: ", item);
      if (item) {
        item.count = item.count + 1;
      } else {
        state.cart.push({ ...product, count: 1 });
      }
    },
    REMOVE_FROM_CART(state, product) {
      const item = state.cart.find(item => item._id === product._id);
      if (item.count > 1) {
        item.count--;
      } else {
        state.cart = state.cart.filter(item => item._id !== product._id);
      }
    },
    REMOVE_FROM_CART_ITEM(state, product) {
      const item = state.cart.find(item => item._id === product._id);
      item.count = 1;
      if (item.count > 1) {
        item.count--;
      } else {
        state.cart = state.cart.filter(item => item._id !== product._id);
      }
    },
    SET_CART(state, cart) {
      state.cart = cart;
    },
  },
  actions: {
    saveUser({ commit }, payload) {
      localStorage.setItem('token', payload);
      commit('GET_USER', payload);
    },
    logout({ commit }) {
      commit('GET_USER', '');
      localStorage.removeItem('token');
    },
    readToken({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        commit('GET_USER', token);
      } else {
        commit('GET_USER', '');
      }
    },
    setCart({ commit }, cart) {
      commit('SET_CART', cart);
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    removeFromCart({ commit }, product) {
      commit('REMOVE_FROM_CART', product);
    },
    removeFromCartItem({ commit }, product) {
      commit('REMOVE_FROM_CART_ITEM', product);
    },
    emptyCart({ commit }) {
      commit('SET_CART', []);
    },
  },
  getters: {
    stateActive: (state) => !!state.token,
    cart: (state) => state.cart,
  }
});

export default store;
