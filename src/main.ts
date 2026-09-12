import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useConfigStore } from './store/store';
import App from './App.vue';
import './index.css';
import './icons.generated';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
// Initialize the store here to ensure it exists before importing components
const store = useConfigStore();
await import(`./assets/css/themes/${store.colors}.css`);
app.component('fa-icon', FontAwesomeIcon);
app.mount('#app');
