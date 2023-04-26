import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Home from '../components/Home.vue';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import Admin from '../pages/Admin.vue';
import Customer from '../pages/Customer.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginForm,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterForm,
        },
        {
            path: '/Admin',
            name: 'admin',
            component: Admin,
            beforeEnter: (to, from, next) => {
                const loggedIn = store.state.loggedIn;
                const role = store.state.role;

                if(loggedIn && role === 'admin'){
                    next();
                }else {
                    next({ name: 'home' });
                }
            }
            
        },
        {
            path: '/customer',
            name: 'customer',
            component: Customer,
            beforeEnter: (to, from, next) => {
                const loggedIn = store.state.loggedIn;
                const role = store.state.role;

                if(loggedIn && role === 'customer'){
                    next();
                }else {
                    next({ name: 'home' });
                }
            }
        },
    ]
});

export default router;