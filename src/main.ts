import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '@/assets/webfont/font.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
/**
 * pinia持久化方案 pinia-plugin-persistedstate
 * https://prazdevs.github.io/pinia-plugin-persistedstate/guide/
 */
pinia.use(piniaPluginPersistedstate)

app.use(pinia)

app.use(router)

app.mount('#app')
