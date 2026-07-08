<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNetwork } from '@/network'

const emit = defineEmits<{
  (e: 'update:captchaId', value: string): void
}>()

const captchaImage = ref('')
const captchaId = ref('')

const loadCaptcha = async () => {
  const { request } = useNetwork()
  try {
    const response = await request<{ captchaId: string; image: string }>({
      url: '/captcha/image',
      method: 'GET',
    })
    captchaImage.value = response.data.image
    captchaId.value = response.data.captchaId
    emit('update:captchaId', response.data.captchaId)
  } catch (error) {
    console.error('加载验证码失败:', error)
  }
}

const refreshCaptcha = () => {
  loadCaptcha()
}

onMounted(() => {
  loadCaptcha()
})

defineExpose({
  refreshCaptcha,
})
</script>

<template>
  <div class="captcha-container">
    <img :src="captchaImage" alt="验证码" class="captcha-image" @click="refreshCaptcha" />
    <van-button text type="default" size="small" @click="refreshCaptcha">
      换一张
    </van-button>
  </div>
</template>

<style lang="less" scoped>
.captcha-container {
  display: flex;
  align-items: center;
  gap: 10px;
  
  .captcha-image {
    width: 120px;
    height: 40px;
    cursor: pointer;
    border-radius: 4px;
  }
}
</style>
