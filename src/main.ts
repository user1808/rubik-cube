import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@unhead/vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import PrimeVue from 'primevue/config';
import App from './App.vue';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const head = createHead();
createApp(App).use(pinia).use(PrimeVue, { theme: 'none' }).use(head).mount('#app');
