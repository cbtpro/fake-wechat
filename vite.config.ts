import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    minify: 'terser',
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          'vue': 'vue',
          // 'vue-router': 'vue-router',
        },
        paths: {
          // 'vue': 'https://cdn.jsdelivr.net/npm/vue@3.3.4/+esm',
          'vue': 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.3.4/vue.esm-browser.prod.min.js',
          // 'vue-router': 'https://cdn.jsdelivr.net/npm/vue-router@4.2.2/+esm',
        }
      },
    },
    terserOptions: {
      //打包后移除console和注释
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
