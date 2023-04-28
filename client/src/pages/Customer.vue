<template>
    <div>
        <h1>Customer</h1>
        <h3>Hello {{ username }}</h3>
        <button type="submit" @click="performLogout">Log out</button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    mounted() {
        this.performGetUser();


    },
    computed: {
        ...mapState(['user']),
        username() {
            return this.user ? this.user.username : '';
        },
    },
    methods: {
        ...mapActions(['logout', 'getUser']),
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
