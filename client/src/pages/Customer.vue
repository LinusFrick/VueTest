<template>
    <h1>Customer</h1>
    Hello {{ loggedinUsername }}
    <button type="submit" @click="performLogout" >Log out</button>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
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

computed: {
    ...mapGetters(['loggedinUsername']),
    ...mapState(['user']),
    username(){
        return this.user ? this.user.username : '';
    }
    }
}
</script>