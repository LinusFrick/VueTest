<script>
import {mapState} from "vuex";

export default {
    name: "Menu",
    computed: {
        ...mapState(['items']),
    },
    mounted() {
        this.$store.dispatch('getItems');
    },
}
</script>

<template>
    <ul>
        <li v-for="product in items" :key="product._id">
            <h3>{{ product.name }}</h3>
            <img :src="product.image" alt="image of" />
            <p>{{ product.description }}</p>
            <h6>{{ product.price }}</h6>
        </li>

    </ul>
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