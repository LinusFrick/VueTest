<template>
    <h1>Admin</h1>
    <button type="submit" @click="performLogout" >Log out</button>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
    ...mapState(['user']),
    username(){
        return this.user ? this.user.username : '';
    }
    }
}
</script>