import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      user: null,
      loggedIn: false,
      role: 'customer',
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.loggedIn = !!user;
      state.role = user ? user.role : 'customer';
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const response = await axios.post('/api/login', { username, password });
        commit('setUser', response.data.user);
        return true;
      } catch (error) {
        console.error('login failed', error);
        return false;
      }
    },
    async register({ commit }, { username, email, password }) {
      try {
        const response = await axios.post('/api/register', { username, email, password });
        commit('setUser', response.data.user);
        return true;
      } catch {
        console.error('registration error', error);
        return false;
      }
    },
    logout({ commit }) {
      axios.delete('api/logout')
        .then(() => {
          commit('setUser', null);
        }).catch(error => {
          console.error('logout error', error);
        });
    },
  },
});

export default store;
