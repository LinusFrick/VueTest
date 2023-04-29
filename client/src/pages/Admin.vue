<script>
import { mapState, mapActions } from 'vuex';
import addProducts from "../components/addProducts.vue";
import AdminEdit from './AdminEdit.vue';
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
    <button class sign type="submit" @click="performLogout" >Log out</button>
    <addProducts/>
    <router-link :to="{name: 'AdminEdit'}">Menu</router-link>
    <router-view></router-view>
</template>