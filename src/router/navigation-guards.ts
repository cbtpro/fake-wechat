import type { RouteLocationNormalized } from 'vue-router'
import { useHtmlHeadTitle } from '@/utils/html-head-title'
import { useAuthStore } from '@/stores/auth'
import { showNotify } from 'vant'

export const validateAuthFn = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const { meta } = to
  const { skipAuth } = meta

  if (skipAuth) {
    return true
  }

  const authStore = useAuthStore()
  const { authInfo } = authStore

  if (!authInfo.access_token) {
    return {
      path: '/sign-in',
      query: { redirect: to.fullPath },
    }
  }

  if (authInfo.expires_at && Date.now() > authInfo.expires_at) {
    authStore.setAuthInfo({})
    showNotify({
      type: 'warning',
      message: '登录已过期，请重新登录',
    })
    return {
      path: '/sign-in',
      query: { redirect: to.fullPath },
    }
  }

  return true
}

export const sendToAnalyticsFn = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  console.log(to, from)
}

export const updateHtmlTitleFn = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const htmlHeadTitle = useHtmlHeadTitle()
  const { meta } = to
  const { title } = meta
  htmlHeadTitle.setTitle({
    title: title as string,
  })
}
