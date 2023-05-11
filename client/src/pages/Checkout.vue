<template>
<h1>{{ totalCost }}</h1>
<ul>
    <li v-for="(product, index) in cart" :key="index">
        <h3>{{ product.name }}</h3>
            <p>Quantity: {{ product.quantity }}</p>
            <h6>Price {{ product.price }}</h6>
    </li>
</ul>


<button @click="handleCheckout(user, cart)">Order</button>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import axios from 'axios';

export default {
    methods: {
        async handleCheckout() {
    if (!this.user) {
        console.error('User is not defined');
        return;
    }

    try {
        const payload = {
            user: this.user,
            cart: this.cart.map(item => ({
                productId: item.productId,
                name: item.name,
                quantity: item.quantity
            })),
            total: this.totalCost
            };

        console.log('payload: ', payload);

        const response = await axios.post('http://localhost:8080/order', payload);
        console.log(response.data);
    } catch (error) {
        console.error('Error placing order', error);
    }
},
        async created() {
            await this.getUser();
            this.handleCheckout();
        },
        async handleRemoveFromCart(product) {
            try {
            const productId = product.productId;
            const itemData = { productId };
            console.log('Removing item:', itemData);
            await this.removeFromCart(itemData);
            }catch (error) {
            console.error('error removing item', error);
            }
        },
    },
    computed: {
        ...mapState(['cart', 'user']),
        ...mapGetters(['totalCost', 'getCart']),
        ...mapActions(['getUser']),
        totalCost() {
            return this.cart.reduce((total, product) => total + product.price * product.quantity, 0);
        },
    },
}
</script>