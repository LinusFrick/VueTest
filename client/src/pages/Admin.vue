<script>
import { mapState, mapActions } from 'vuex';
import addProducts from "../components/addProducts.vue";
import AdminEdit from './AdminEdit.vue';
import axios from 'axios';
export default {
    components: {
        addProducts
    },
    data(){
        return{
            orders: []
        }
    },
    methods: {
        ...mapActions(['logout']),
        async performLogout() {
            try {
                await this.logout();
                this.$router.push({ name: 'home' });
            } catch (error) {
                console.error('Error while logging out', error);
            }
        },
        async getOrders() {
            try {
                const response = await axios.get('http://localhost:8080/order');
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.error('error fetching orders', error);
            }
        },
    },
    async mounted() {
        this.orders = await this.getOrders();
    },
}
</script>

<template>
    <h1>Admin</h1>
    <button class sign type="submit" @click="performLogout" >Log out</button>
    <addProducts/>
    <router-link :to="{name: 'AdminEdit'}">Menu</router-link>
    <router-view></router-view>
    <div v-for="order in orders" :key="order._id">
    <p>Order ID: {{ order._id }}</p>
    <p>Items:</p>
    <ul>
      <li v-for="item in order.cart" :key="item._id">
        <p>Product: {{ item.name }}</p>
        <p>Quantity: {{ item.quantity }}</p>
      </li>
    </ul>
  </div>
</template>