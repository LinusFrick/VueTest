<template>
<h2>ORDERS</h2>
<div>
        <div style="border: white 2px solid" v-for="(order, index) in orders" :key="index">
            <p>Order: {{ index + 1 }}</p>
            <p>User: {{ order.user }}</p>
                <div v-for="(item, itemIndex) in order.cart" :key="itemIndex">
                    <p>Item: {{ item.product.name }}</p>
                </div>
        </div>
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
                this.user = res.data.user
                console.log('orders: ',this.orders);
                console.log('user: ',this.user);
            })
        }
    },
    mounted(){
        this.getOrders();
    }
}
</script>