import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import './style.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions);

app.use(pinia)
app.mount('#app')