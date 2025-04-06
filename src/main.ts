import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Ripple from 'primevue/ripple';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import PrimeVue from 'primevue/config';
import App from './App.vue';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
createApp(App)
  .use(pinia)
  .use(PrimeVue, {
    ripple: true,
    theme: 'none',
    pt: {
      button: {
        label: 'text-xl font-bold',
      },
      select: {
        label: 'text-xl text-black peer',
        option: 'select-none text-black',
        dropdown: 'text-black peer-aria-expanded:rotate-180 transition-transform',
      },
    },
  })
  .directive('ripple', Ripple)
  .mount('#app');
