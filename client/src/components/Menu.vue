<script>
import {mapState, mapActions} from "vuex";
import axios from 'axios';

export default {
    name: "Menu",
    computed: {
        ...mapState(['items', 'cart', 'user']),
        totalCost() {
            return this.cart.reduce((total, product) => total + product.price * product.quantity, 0);
        },
    },
    mounted() {
        this.$store.dispatch('getItems');
    },
    methods: {
        ...mapActions(['addToCart', 'removeFromCart']),
        async handleAddToCart(product) {
            try {
                const productId = product._id;
                const quantity = 1;
                const price = product.price;
                const name = product.name;
                const itemData = { productId, quantity, price, name};
                console.log('itemData:', itemData);
                await this.addToCart(itemData);
                console.log('Cart after adding:', this.cart); 
            }catch (error) {
                console.error('error adding item', error);
            }
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
        async handleCheckout() {
            try {
                const order = {
                    user: this.user,
                    cart: this.cart,
                    total: this.totalCost,
                };
                const response = await axios.post('http://localhost:8080/order', order);
                console.log(response.data);
            } catch (error) {
                console.error('error placing order', error);
            }
        },

    }
}
</script>


<template>
    <ul>
        <li v-for="product in items" :key="product._id">
            <h3>{{ product.name }}</h3>
            <img :src="product.image" alt="image of" />
            <p>{{ product.description }}</p>
            <h6>{{ product.price }}</h6>
            <button @click="handleAddToCart(product)" >Add to cart</button>
        </li>
    </ul>
    <h2>Cart</h2>
    <ul>
        <li v-for="(product, index) in cart" :key="index" >
            <h3>{{ product.name }}</h3>
            <p>Quantity: {{ product.quantity }}</p>
            <h6>Price {{ product.price }}</h6>
            <button @click="handleRemoveFromCart(product)" >Remove from cart</button>
        </li>
    </ul>
    <h2>Total Cost: {{ totalCost }}</h2>
    <button @click="handleCheckout(user)">Checkout</button>
</template>

  

<style scoped>
img{
    width: 20px;
    height: 20px;
}
ul{
    list-style-type: none;
    margin-bottom: 2px;
}
li{
    border: solid white 2px;
}
</style>