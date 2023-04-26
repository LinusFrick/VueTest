import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store/index';
import router from './routes';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
