import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { sendToAnalyticsFn, updateHtmlTitleFn } from './navigation-guards'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '微信',
      },
      component: HomeView
    },
    {
      path: '/friend-list',
      name: 'friend-list',
      meta: {
        title: '通讯录',
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FriendListView.vue')
    },
    {
      path: '/discover',
      name: 'discover',
      meta: {
        title: '发现',
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DiscoverView.vue')
    },
    {
      path: '/my',
      name: 'my',
      meta: {
        title: '我',
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MyView.vue')
    }
  ]
})

// 注册发送分析日志到后台的导航守卫
router.afterEach(sendToAnalyticsFn)

// 注册更新title的导航守卫
router.afterEach(updateHtmlTitleFn)

export default router
