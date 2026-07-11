/** 首屏配置类型 */
type SplashType = 'SPLASH' | 'AD'

/** 首屏状态 */
type SplashStatus = 'ACTIVE' | 'INACTIVE'

/** 适用主题 */
type SplashTheme = 'ALL' | 'LIGHT' | 'DARK'

/** 首屏配置 */
interface ISplashConfig {
  id: number
  type: SplashType
  title: string
  content: string
  imageUrl: string
  linkUrl: string
  duration: number
  sortOrder: number
  status: SplashStatus
  theme: SplashTheme
  startTime: Date
  endTime: Date
  createdAt: Date
  updatedAt: Date
}
