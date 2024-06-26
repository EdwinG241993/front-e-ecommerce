import { createStore } from 'vuex';
import { jwtDecode } from 'jwt-decode';

const store = createStore({
  state() {
    return {
      token: '',
      role: '',
      usuarioDB: ''
    };
  },
  mutations: {
    getUser(state, payload) {
      state.token = payload;
      if (payload === '') {
        state.usuarioDB = '';
      } else {
        state.usuarioDB = jwtDecode(payload);
        state.role = state.usuarioDB.data.role;
      }
    }
  },
  actions: {
    saveUser({ commit }, payload) {
      localStorage.setItem('token', payload);
      commit('getUser', payload);
    },
    logout({ commit }) {
      commit('getUser', '');
      localStorage.removeItem('token');
    },
    readToken({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        commit('getUser', token);
      } else {
        commit('getUser', '');
      }
    }
  },
  getters: {
    stateActive: (state) => !!state.token
  }
});

export default store;
