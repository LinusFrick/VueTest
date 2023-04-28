<template>
<ul>
    <li v-for="item in items" v-if="items" :key="item._id" >
        <h3>{{ item.name }}</h3>
        <img :src="item.image" alt="image of" />
        <p>{{ item.description }}</p>
        <h6>{{ item.price }}</h6>

    </li>
</ul>
</template>

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

<style scoped>
img{
    width: 20px;
    height: 20px;
}
ul{
    list-style-type: none;
}
</style>