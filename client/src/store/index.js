import { createStore } from 'vuex';
import axios from 'axios';
import createPersitedState from 'vuex-persistedstate';

const store = createStore({
  plugins: [createPersitedState()],
  state: {
      user: null,
      loggedIn: false,
      role: 'customer',
      items: [],
      cart: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.loggedIn = !!user;
      state.role = user ? user.role : 'customer';
    },
    setItems(state, items) {
      state.items = items;
    },
    addItem(state, items){
      state.items = items;
    },
    addItem(state, item) {
      state.items.push(item);
    },
    addToCart(state, item) {
      state.cart.push(item);
    },
    removeFromCart(state, item){
      const index = state.cart.findIndex(cartItem => cartItem.productId === item.productId);
      if(index !== -1) {
        state.cart.splice(index, 1);
      }
    }
  },
  getters:{
    getItems(state){
      return state.items;
    },
    getCart(state){
      return state.cart;
    },
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
    async removeFromCart({ commit }, itemData){
      commit('removeFromCart', itemData);
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
          return user;
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
    async addItem({ commit }, itemData) {
      try {
        const response = await axios.post('http://localhost:8080/menu', itemData);
        const updatedItemsResponse = await axios.get('http://localhost:8080/menu');
        commit('addItem', response.data);
        commit('setItems', updatedItemsResponse.data);
        return response.data;
      } catch (error) {
        console.error('Error adding item', error);
        throw error;
      }
    },
    async getItems({ commit }) {
      try {
        const response = await axios.get('http://localhost:8080/menu');
        console.log('Fetched items:', response.data);
        const items = response.data.filter(item => item !== null);
        commit('setItems', items);
      } catch (error) {
        console.error('Error retrieving items', error);
      }
    },
    async addToCart({ commit }, itemData) {
      try {
        commit('addToCart', itemData);
      } catch (error) {
        console.error('Error adding item to cart', error);
        throw error;
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
    async deleteProduct({ commit }, id) {
      try {
        console.log(`Deleting product with id ${id}`);
        const response = await axios.delete('http://localhost:8080/menu/' +id);
        const updatedItemsResponse = await axios.get('http://localhost:8080/menu');
        const updatedItems = updatedItemsResponse.data.filter(item => item !== null);
        commit('setItems', updatedItems);
      } catch (error) {
        console.error('Error while deleting product:', error);
      }
    },
    async updateProduct({ commit, dispatch }, productData) {
      try {
        console.log(productData);
        const { _id, name, description, price, image, type } = productData;
        const response = await axios.put('http://localhost:8080/menu/' +_id, {
          name, description, price, image, type
        });
        console.log('passing ID:',_id);
        console.log(productData);
    
        if (response.status === 200) {
          const updatedProduct = response.data;
          dispatch('getItems');
        } else {
          console.error('error updating product', response.data);
        }
      } catch (error) {
        console.error('error updating product', error);
      }
    },
}});

export default store;
