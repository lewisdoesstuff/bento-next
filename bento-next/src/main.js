import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//Add all icons to the library so you can use it in your page
library.add(fas);

const app = createApp(App).component('fa-icon', FontAwesomeIcon);

app.mount('#app');
