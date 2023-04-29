<script>
import { mapState, mapActions } from 'vuex';
import Menu from "../components/Menu.vue";

export default {
    components: {
      Menu
    },
    async mounted() {
        await this.performGetUser();
        await this.getItems();

    },
    computed: {
        ...mapState(['user', 'items']),
        username() {
            return this.user ? this.user.username : '';
        },
    },
    methods: {
        ...mapActions(['logout', 'getUser', 'getItems']),
        async performLogout() {
            try {
                await this.logout();
                this.$router.push({ name: 'home' });
            } catch (error) {
                console.error('Error while logging out', error);
            }
        },
        async performGetUser() {
            try {
                if (this.user && this.user._id) {
                    await this.getUser(this.user.username);
                }
            } catch (error) {
                console.error('error getting user', error);
            }
        }
    },
};
</script>

<template>
    <div>
        <h1>Customer</h1>
        <h3>Hello {{ username }}</h3>
        <button class="sign" type="submit" @click="performLogout">Log out</button>
        <Menu />
    </div>
</template>

<style>

</style>
