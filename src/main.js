import { createApp } from 'vue';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'; // Importing VueQueryPlugin
import App from './App.vue';
import router from './router'; // Importing router
import './router/styles.css'; // Importing router styles

// Create a QueryClient instance
const queryClient = new QueryClient();

const app = createApp(App);

app.use(VueQueryPlugin); // Use VueQueryPlugin
app.use(router); // Use router
app.mount('#app');
