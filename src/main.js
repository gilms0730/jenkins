window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import LoadScript from 'vue-plugin-load-script';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

 
import App from './App.vue'
import router from './router';

import 'jquery';
import 'jquery-ui';

const pinia = createPinia();
const app = createApp(App)

app.use(pinia);
app.use(LoadScript);
app.use(router);
app.mount('#app')