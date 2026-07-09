import { useNetwork } from '@/network'
import { useAuthStore } from '@/stores/auth'

export const useUser = () => {
  const { request } = useNetwork()
  const authStore = useAuthStore()

  const getProfile = () => {
    return new Promise<IResponseBody<IUserInfo>>((resolve, reject) => {
      request<IUserInfo>({
        url: '/user/profile',
        method: 'GET',
      }).then((response) => {
        if (response.success && response.data) {
          authStore.updateUserInfo(response.data)
        }
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  const uploadAvatar = (file: File) => {
    return new Promise<IResponseBody<{ avatar: string; user: IUserInfo }>>(
      (resolve, reject) => {
        const formData = new FormData()
        formData.append('file', file)

        request<{ avatar: string; user: IUserInfo }>({
          url: '/user/avatar',
          method: 'POST',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((response) => {
          if (response.success && response.data?.user) {
            authStore.updateUserInfo(response.data.user)
          }
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      },
    )
  }

  return {
    getProfile,
    uploadAvatar,
  }
}
