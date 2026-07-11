<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { showToast, showLoadingToast, closeToast } from 'vant'
import { useAuthStore } from '@/stores/auth'
import { useUser } from '@/utils/user/user'

const authStore = useAuthStore()
const { getProfile, uploadAvatar } = useUser()

const fileInputRef = ref<HTMLInputElement | null>(null)
const uploading = ref(false)

onMounted(() => {
  if (!authStore.userInfo) {
    getProfile().catch(() => {})
  }
})

const handleAvatarClick = () => {
  fileInputRef.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    showToast('请选择图片文件')
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    showToast('图片大小不能超过 5MB')
    return
  }

  uploading.value = true
  showLoadingToast({
    message: '上传中...',
    forbidClick: true,
  })

  uploadAvatar(file)
    .then((res) => {
      if (res.success) {
        showToast('头像更新成功')
      } else {
        showToast(res.message || '上传失败')
      }
    })
    .catch(() => {
      showToast('上传失败，请重试')
    })
    .finally(() => {
      uploading.value = false
      closeToast()
      if (fileInputRef.value) {
        fileInputRef.value.value = ''
      }
    })
}
</script>

<template>
  <van-nav-bar
    :safe-area-inset-top="true"
    :placeholder="true"
    :fixed="true"
    :border="false"
    title="个人信息"
    left-arrow
    @click-left="$router.back()"
  />
  <body-container>
    <pane-list>
      <pane-list-item @click="handleAvatarClick">
        <template #left>
          <span class="label">头像</span>
        </template>
        <template #right>
          <van-image
            :src="authStore.userInfo?.avatar || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'"
            class="avatar-img"
            round
          />
          <van-icon name="arrow" size="18" />
        </template>
      </pane-list-item>
    </pane-list>
    <pane-list>
      <pane-list-item>
        <template #left>
          <span class="label">名字</span>
        </template>
        <template #default>
          <span class="value">{{ authStore.userInfo?.nickname || '未设置' }}</span>
        </template>
        <template #right>
          <van-icon name="arrow" size="18" />
        </template>
      </pane-list-item>
      <pane-list-item>
        <template #left>
          <span class="label">微信号</span>
        </template>
        <template #default>
          <span class="value">{{ authStore.userInfo?.username || '—' }}</span>
        </template>
        <template #right>
          <van-icon name="arrow" size="18" />
        </template>
      </pane-list-item>
      <pane-list-item>
        <template #left>
          <span class="label">我的二维码</span>
        </template>
        <template #default></template>
        <template #right>
          <van-icon name="qr" size="18" />
          <van-icon name="arrow" size="18" />
        </template>
      </pane-list-item>
      <pane-list-item>
        <template #left>
          <span class="label">+ 状态</span>
        </template>
        <template #default></template>
        <template #right>
          <van-icon name="arrow" size="18" />
        </template>
      </pane-list-item>
    </pane-list>
    <pane-list>
      <pane-list-item>
        <template #left>
          <span class="label">性别</span>
        </template>
        <template #default>
          <span class="value placeholder">未设置</span>
        </template>
        <template #right>
          <van-icon name="arrow" size="18" />
        </template>
      </pane-list-item>
      <pane-list-item>
        <template #left>
          <span class="label">地区</span>
        </template>
        <template #default>
          <span class="value placeholder">未设置</span>
        </template>
        <template #right>
          <van-icon name="arrow" size="18" />
        </template>
      </pane-list-item>
      <pane-list-item>
        <template #left>
          <span class="label">个性签名</span>
        </template>
        <template #default>
          <span class="value placeholder">未设置</span>
        </template>
        <template #right>
          <van-icon name="arrow" size="18" />
        </template>
      </pane-list-item>
    </pane-list>
    <input
      ref="fileInputRef"
      type="file"
      accept="image/*"
      style="display: none"
      @change="handleFileChange"
    />
  </body-container>
</template>

<style lang="less" scoped>
.label {
  font-size: 28px;
  color: #333;
}
.value {
  font-size: 26px;
  color: #999;
  &.placeholder {
    color: #bbb;
  }
}
.avatar-img {
  width: 80px;
  height: 80px;
}
</style>
