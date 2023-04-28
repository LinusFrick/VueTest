<script>
import { mapState, mapActions } from 'vuex';
import addProducts from "../components/addProducts.vue";
export default {
    components: {
        addProducts
    }
    ,
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
    },
}
</script>

<template>
    <h1>Admin</h1>
    <button type="submit" @click="performLogout" >Log out</button>
    <addProducts/>
</template>