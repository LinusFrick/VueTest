import { createStore } from 'vuex';
import axios from 'axios';
import createPersitedState from 'vuex-persistedstate';

const store = createStore({
  plugins: [createPersitedState()],
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
  getters:{
  },
  actions: {
    async login({commit}, {username, password}) {
      try {
        const response = await axios.post('http://localhost:8080/login', {username, password});
        console.log(username);

        console.log('Server response:', response);

        if (response.data.loggedIn) {
          const user = {
            role: response.data.role,
            _id: response.data._id,
            username: response.data.username,

          };

          commit('setUser', user);
          console.log('this is',username)
          return user.role;
        } else {
          console.error('Login failed:', response.data.message);
          return null;
        }
      } catch (error) {
        console.error('login failed', error);
        return null;
      }


    },
    async getUser({ commit }, userId) {
      axios.get(`http://localhost:8080/login/${userId}`).then(response => {
        console.log('user data', response.data)
        if (response.data.loggedIn) {
          const user = {
            _id: response.data._id,
            role: response.data.role,
            username: response.data.username,
          };

          commit('setUser', user);
          console.log('username:', username);
          return user.role;
        } else {
          console.error('Login failed:', response.data.message);
          return null;
        }
      }).catch(error => {
        console.error('Error retrieving user information', error);
      });
    },
    async register({ commit }, { username, email, password }) {
      try {
        const response = await axios.post('http://localhost:8080/register', { username, email, password });
        commit('setUser', response.data.user);
        return true;
      } catch {
        console.error('registration error');
        return false;
      }
    },

    logout({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .delete('http://localhost:8080/login')
          .then(() => {
            commit('setUser', null);
            resolve();
          })
          .catch(error => {
            console.error('logout error', error);
            reject();
          });
      });
    },
}});

export default store;
