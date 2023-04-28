<template>
    <div>
        <h2>Add Item</h2>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name">
            </div>
            <div>
                <label for="description">Description:</label>
                <textarea id="description" v-model="description"></textarea>
            </div>
            <div>
                <label for="price">Price:</label>
                <input type="number" id="price" v-model="price">
            </div>
            <div>
                <label for="image">Image:</label>
                <input type="text" id="image" v-model="image">
            </div>
            <div>
                <label for="type">Type:</label>
                <select id="type" v-model="type">
                    <option value="pizza">Pizza</option>
                    <option value="drink">Drink</option>
                    <option value="aside">Aside</option>
                </select>
            </div>
            <button type="submit">Add Item</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            name: '',
            description: '',
            price: '',
            image: '',
            type: "pizza"
        }
    },
    methods: {
        ...mapActions(['addItem']),
        async handleSubmit() {
            const itemData = {
                name: this.name,
                description: this.description,
                price: this.price,
                image: this.image,
                type: this.type
            };

            this.$store
                .dispatch("addItem", itemData)
                .then(() => {
                    console.log("Item added successfully");
                    this.name = "";
                    this.description = "";
                    this.price = "";
                    this.image = "";
                    this.type = "pizza";
                })
                .catch((error) => {
                    console.error("Error adding item", error);
                });
        },
    }
}
</script>
