import { useNetwork } from '@/network'

/** 缓存key */
const SPLASH_CACHE_KEY = 'splash_config_cache'
/** 缓存TTL: 1小时 */
const SPLASH_CACHE_TTL = 60 * 60 * 1000

interface SplashCache {
  data: ISplashConfig[]
  timestamp: number
}

/**
 * 检测当前系统主题
 */
function detectTheme(): SplashTheme {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'DARK'
  }
  return 'LIGHT'
}

/**
 * 从localStorage读取缓存的splash数据
 */
function readCache(): ISplashConfig[] | null {
  try {
    const raw = localStorage.getItem(SPLASH_CACHE_KEY)
    if (!raw) return null
    const cache: SplashCache = JSON.parse(raw)
    if (Date.now() - cache.timestamp > SPLASH_CACHE_TTL) {
      localStorage.removeItem(SPLASH_CACHE_KEY)
      return null
    }
    return cache.data
  } catch {
    return null
  }
}

/**
 * 写入splash数据到localStorage
 */
function writeCache(data: ISplashConfig[]) {
  try {
    const cache: SplashCache = { data, timestamp: Date.now() }
    localStorage.setItem(SPLASH_CACHE_KEY, JSON.stringify(cache))
  } catch {
    // ignore quota errors
  }
}

export const useSplash = () => {
  const { request } = useNetwork()

  /**
   * 从后端获取有效的首屏配置
   * @param type 配置类型，不传则获取全部
   * @param theme 主题，不传则自动检测
   */
  const fetchActiveSplash = (
    type?: SplashType,
    theme?: SplashTheme,
  ): Promise<IResponseBody<ISplashConfig[]>> => {
    const effectiveTheme = theme || detectTheme()
    const params: Record<string, string> = {}
    if (type) params.type = type
    if (effectiveTheme) params.theme = effectiveTheme

    return request<ISplashConfig[]>({
      url: '/admin/splash/active',
      method: 'GET',
      params,
    })
  }

  /**
   * 获取首屏配置（优先使用缓存）
   */
  const getSplashWithCache = async (
    type?: SplashType,
  ): Promise<ISplashConfig[]> => {
    // 优先使用缓存
    const cached = readCache()
    if (cached) return cached

    // 请求后端
    try {
      const response = await fetchActiveSplash(type)
      if (response.success && response.data) {
        writeCache(response.data)
        return response.data
      }
    } catch {
      // 网络错误时静默处理
    }
    return []
  }

  /**
   * 预加载首屏图片
   */
  const preloadImages = (configs: ISplashConfig[]) => {
    configs.forEach((config) => {
      if (config.imageUrl) {
        const img = new Image()
        img.src = config.imageUrl
      }
    })
  }

  return {
    fetchActiveSplash,
    getSplashWithCache,
    preloadImages,
  }
}
