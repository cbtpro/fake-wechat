interface IUserInfo {
  id: number
  username: string
  nickname: string
  avatar: string
}

interface IAuthInfo {
  access_token?: string
  expires_at?: number
  user?: IUserInfo
}
