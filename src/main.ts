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
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
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

enableMocking().then(() => {
  app.mount('#app')
})
