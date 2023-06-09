import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useConfigStore } from './store/store';
import App from './App.vue';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//Add all icons to the library so you can use it in your page
library.add(fas, fab);

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
// Initialize the store here to ensure it exists before importing components
const store = useConfigStore();
await import(`./assets/css/themes/${store.colors}.css`);
app.component('fa-icon', FontAwesomeIcon);
app.mount('#app');
