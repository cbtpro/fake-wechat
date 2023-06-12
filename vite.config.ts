import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { compression as gzipCompression } from 'vite-plugin-compression2'
import progress from 'vite-plugin-progress'
import colors from 'picocolors'

/**
 * @see https://github.com/jeddygong/vite-plugin-progress/blob/main/src/index.ts
 */
const format = `${colors.green(colors.bold('Building'))} ${colors.cyan('[:bar]')} :percent`;

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    gzipCompression({
      exclude: [/\.(DS_Store)$/],
      deleteOriginalAssets: false,
    }),
    progress({
      format,
      total: 200
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [
        require('postcss-import'),
        require('postcss-url'),
        require('postcss-aspect-ratio-mini'),
        require('postcss-write-svg')({ utf8: false }),
        require('postcss-px-to-viewport')({
          viewportWidth: 750, // 视口宽度，对应设计稿宽度
          unitPrecision: 3, // 指定px转换之后的小数位数
          viewportUnit: 'vw', // 转换的单位
          fontViewportUnit: 'vw', // 字体使用的单位
          replace: true, //  是否直接更换属性值，而不添加备用属性
          selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换的类
          exclude: /(\/|\\)(node_modules)(\/|\\)/, //禁止更改第三方UI框架样式
          minPixelValue: 1, // 小于或等于1px不转换
          mediaQuery: true // 允许在媒体查询中转换
        }),
        require('cssnano')({
          'cssnano-preset-advaced': {
            zIndex: false,
            autoprefixer: true
          }
        })
      ]
    }
  },
  build: {
    minify: 'terser',
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'vue'
          // 'vue-router': 'vue-router',
        },
        paths: {
          // 'vue': 'https://cdn.jsdelivr.net/npm/vue@3.3.4/+esm',
          vue: 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.3.4/vue.esm-browser.prod.min.js'
          // 'vue-router': 'https://cdn.jsdelivr.net/npm/vue-router@4.2.2/+esm',
        }
      }
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
