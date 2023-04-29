<template>
    <ul>
        <li v-for="product in items" :key="product._id">
            <h3>{{ product.name }}</h3>
            <img :src="product.image" alt="image of" />
            <p>{{ product.description }}</p>
            <h6>{{ product.price }}</h6>
            <button>Edit</button>
            <button @click="deleteProduct(product._id)">Delete</button>
        </li>

    </ul>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
    name: "AdminEdit",
    computed: {
        ...mapState(['items']),
    },
    methods: {
        ...mapActions(['deleteProduct']),
    },
    mounted() {
        this.$store.dispatch('getItems');
    },
}
</script>

<style>
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