import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'default-passive-events'

import '@/assets/main.css'
import '@/assets/webfont/font.css'

import { ConfigProvider } from 'vant'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueClick from 'vue-click'

// 引入vant toast样式，否则命令调用方式无法显示
import 'vant/es/notify/style'

import App from '@/App.vue'
import router from './router'

async function enableMocking() {
  if (import.meta.env.VITE_APP_MOCK_ENABLED === 'true') {
    const { worker } = await import('./mocks/browser');
    return worker.start();
  }

  return Promise.resolve();
}

const app = createApp(App)
const pinia = createPinia()
/**
 * pinia持久化方案 pinia-plugin-persistedstate
 * https://prazdevs.github.io/pinia-plugin-persistedstate/guide/
 */
pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(pinia)

app.use(VueClick)

app.use(ConfigProvider)

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && import.meta.env.VITE_APP_MOCK_ENABLED !== 'true') {
    try {
      const isDev = import.meta.env.MODE === 'development';
      const swPath = isDev ? '/sw.js' : './sw.js';
      const registration = await navigator.serviceWorker.register(swPath);
      console.log('Service Worker registered: ', registration);

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New version available, refresh to update');
            }
          });
        }
      });
    } catch (error) {
      console.error('Service Worker registration failed: ', error);
    }
  }
};

enableMocking().then(() => {
  app.mount('#app');
  registerServiceWorker();
})
