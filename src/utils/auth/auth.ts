import { useNetwork } from '@/network'
import { useAuthStore } from '@/stores/auth'

export const useAuth = () => {
  const { request } = useNetwork()

  const signIn = (user: ISignUpUser & { captcha: string; captchaId: string }) => {
    return new Promise<IResponseBody<IAuthInfo>>((resolve, reject) => {
      request<IAuthInfo>({
        url: '/auth/login',
        method: 'POST',
        data: user,
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

  const authStore = useAuthStore()
  const storageAuthInfo = (authInfo: IAuthInfo) => {
    authStore.setAuthInfo(authInfo);
  }

  return {
    signIn,
    storageAuthInfo,
  }
}
