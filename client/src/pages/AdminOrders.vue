<template>
<h2>test</h2>
<div>
    <ul>
        <!-- <li v-for="(order, index) in orders" :key="index" >
            <h5>{{ order.cart }}</h5>
            <h6>{{ order.orderdate }}</h6>
            <p>Order ID: {{ order._id }}</p> -->
            <div v-for="(order, index) in orders" :key="index">
                <p>Order: {{ index + 1 }}</p>
                <div v-for="(item, index) in order.cart" :key="index">
                    <p>Item: {{ item.product.name }}</p>
                </div>
                </div>
        <!-- </li> -->
    </ul>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            orders: []
        }
    },
    methods: {
        async getOrders(){
            axios.get('http://localhost:8080/order').then((res) => {
                this.orders = res.data;
                console.log(this.orders);
            })
        }
    },
    mounted(){
        this.getOrders();
    }
}
</script>