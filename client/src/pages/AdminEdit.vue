<template>
    <ul>
        <li v-for="product in items" :key="product._id">
            <h3>{{ product.name }}</h3>
            <img :src="product.image" alt="image of" />
            <p>{{ product.description }}</p>
            <h6>{{ product.price }}</h6>
            <button @click="openEditForm(product)">Edit</button>
            <button @click="deleteProduct(product._id)">Delete</button>
        </li>
        <div v-if="showEditForm">
        <h3>Edit Product</h3>
            <input type="hidden" v-model="editingProduct._id">
            <input v-model="editingProduct.name" placeholder="Name" />
            <input v-model="editingProduct.description" placeholder="Description" />
            <input v-model="editingProduct.price" placeholder="Price" />
            <input v-model="editingProduct.image" placeholder="Image URL" />
            <select v-model="editingProduct.type">
                <option value="pizza">Pizza</option>
                <option value="drink">Drink</option>
                <option value="aside">Aside</option>
            </select>
            <button @click="editProduct">Save</button>
            <button @click="showEditForm = false">Cancel</button>
        </div>

    </ul>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
    name: "AdminEdit",
    data(){
    return {
        editingProduct: null,
        showEditForm: false,
    }
    },
    computed: {
        ...mapState(['items']),
    },
    methods: {
        ...mapActions(['deleteProduct', 'updateProduct']),
        async editProduct() {
        console.log('editingProduct:', this.editingProduct);
            if (this.editingProduct._id) {
                await this.$store.dispatch('updateProduct', this.editingProduct);
                this.showEditForm = false;
            } else {
            console.error('Product ID is undefined');
                }
        },
        openEditForm(product) {
            this.editingProduct = { ...product };
            console.log('Product ID:', this.editingProduct._id);
            this.showEditForm = true;
        },
        async addProducts(){}
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