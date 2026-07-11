<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useSplash } from '@/utils/splash/splash'

const emit = defineEmits<{
  (e: 'finish'): void
}>()

const visible = ref(true)
const countdown = ref(3)
const loading = ref(true)
const splashConfig = ref<ISplashConfig | null>(null)

let timer: ReturnType<typeof setInterval> | null = null

const { getSplashWithCache, preloadImages } = useSplash()

/** 默认显示时长（秒） */
const DEFAULT_DURATION = 3
/** 远程加载超时（毫秒） */
const REMOTE_TIMEOUT = 3000

function startCountdown(duration: number) {
  countdown.value = duration
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      finish()
    }
  }, 1000)
}

function finish() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  visible.value = false
  emit('finish')
}

function skip() {
  finish()
}

onMounted(async () => {
  // 立即启动默认倒计时，保证最低用户体验
  startCountdown(DEFAULT_DURATION)

  // 尝试从后端获取首屏配置（带超时保护）
  const timeoutPromise = new Promise<ISplashConfig[]>(resolve =>
    setTimeout(() => resolve([]), REMOTE_TIMEOUT),
  )

  try {
    const configs = await Promise.race([
      getSplashWithCache('SPLASH'),
      timeoutPromise,
    ])

    if (configs.length > 0) {
      // 取排序最靠前的配置
      splashConfig.value = configs[0]
      preloadImages(configs)

      // 如果远程配置的时长与当前不同，重新计时
      const remoteDuration = configs[0].duration
      if (remoteDuration && remoteDuration !== DEFAULT_DURATION) {
        if (timer) clearInterval(timer)
        startCountdown(remoteDuration)
      }
    }
  } catch {
    // 获取失败，继续使用默认倒计时
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div v-if="visible" class="splash-screen" @click="skip">
    <!-- 有图片配置时显示图片 -->
    <template v-if="splashConfig?.imageUrl">
      <img
        :src="splashConfig.imageUrl"
        class="splash-image"
        alt="splash"
      />
      <div v-if="splashConfig.title" class="splash-title">
        {{ splashConfig.title }}
      </div>
    </template>

    <!-- 无图片但已获取到后台配置时显示标题和内容 -->
    <template v-else-if="splashConfig">
      <div class="splash-content">
        <div v-if="splashConfig.title" class="splash-content-title">
          {{ splashConfig.title }}
        </div>
        <div v-if="splashConfig.content" class="splash-content-text">
          {{ splashConfig.content }}
        </div>
      </div>
    </template>

    <!-- 未获取到配置时显示骨架屏 -->
    <template v-else>
      <div class="splash-skeleton">
        <div class="skeleton-logo" />
        <div class="skeleton-line" />
        <div class="skeleton-line short" />
      </div>
    </template>

    <!-- 倒计时 -->
    <div class="splash-countdown" @click.stop="skip">
      <span>{{ countdown }}s | 跳过</span>
    </div>
  </div>
</template>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ececed;
}

.splash-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.splash-title {
  position: absolute;
  bottom: 120px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 0 40px;
  text-align: center;
}

.splash-content-title {
  font-size: 36px;
  font-weight: 700;
  color: #333;
}

.splash-content-text {
  font-size: 24px;
  color: #666;
  line-height: 1.6;
}

.splash-skeleton {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.skeleton-logo {
  width: 120px;
  height: 120px;
  border-radius: 24px;
  background: linear-gradient(135deg, #d9d9d9, #f0f0f0);
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-line {
  width: 200px;
  height: 16px;
  border-radius: 8px;
  background: #d9d9d9;
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-line.short {
  width: 120px;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.splash-countdown {
  position: absolute;
  bottom: 40px;
  right: 24px;
  padding: 8px 16px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
}
</style>
