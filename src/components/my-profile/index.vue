<!--
 Copyright 2023 Peter Chen

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showLoadingToast, closeToast } from 'vant'
import { ActiveColor } from '@/constants/theme'
import { useAuthStore } from '@/stores/auth'
import { useUser } from '@/utils/user/user'

const authStore = useAuthStore()
const router = useRouter()
const { uploadAvatar, getProfile } = useUser()

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
        showToast('头像上传成功')
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
  <pane-list>
    <div class="my-profile" @click="handleAvatarClick">
      <div class="avatar">
        <van-image
          :src="authStore.userInfo?.avatar || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'"
          class="avatar-img"
          round
        />
      </div>
      <div class="info">
        <div class="nickname">{{ authStore.userInfo?.nickname || '未设置昵称' }}</div>
        <div class="username">用户名：{{ authStore.userInfo?.username || '—' }}</div>
        <div class="status">
          <van-icon name="photograph" size="16" />
          点击头像更换
        </div>
      </div>
      <div class="more">
        <van-icon name="qr" size="24" />
        <van-icon name="arrow" size="24" />
      </div>
      <input
        ref="fileInputRef"
        type="file"
        accept="image/*"
        style="display: none"
        @change="handleFileChange"
      />
    </div>
  </pane-list>
  <pane-list>
    <div class="service">
      <pane-list-item>
        <template #left>
          <van-icon name="cash-o" size="24" />
        </template>
        <template #default>
          服务
        </template>

        <template #right>
          服务
        </template>
      </pane-list-item>
    </div>
  </pane-list>
  <pane-list>
    <div class="service">
      <pane-list-item>
        <template #left>
          <van-icon name="cash-o" size="24" />
        </template>
        收藏
      </pane-list-item>
      <pane-list-item>
        <template #left>
          <van-icon name="photo-o" size="24" />
        </template>
        朋友圈
      </pane-list-item>
      <pane-list-item>
        <template #left>
          <van-icon name="idcard" size="24" :color="ActiveColor" />
        </template>
        卡包
      </pane-list-item>
      <pane-list-item>
        <template #left>
          <van-icon name="cash-o" size="24" />
        </template>
        表情
      </pane-list-item>
    </div>
  </pane-list>
  <pane-list>
    <div class="service">
      <pane-list-item @click="router.push('/settings')">
        <template #left>
          <van-icon name="setting-o" size="24" />
        </template>
        设置
        <template #right>
          <van-icon name="arrow" size="18" />
        </template>
      </pane-list-item>
    </div>
  </pane-list>
</template>

<style lang="less" scoped>
.my-profile {
  position: relative;
  width: 750px;
  height: 300px;
  cursor: pointer;

  .avatar {
    position: absolute;
    left: 24px;
    top: 24px;
    width: 180px;
    height: 180px;
    overflow: hidden;

    .avatar-img {
      width: 100%;
      height: 100%;
    }
  }

  .info {
    position: absolute;
    left: 220px;
    top: 24px;
    width: 400px;
    height: 200px;

    .nickname {
      margin-top: 24px;
      font-size: 32px;
      font-weight: 600;
    }

    .username {
      margin-top: 8px;
      font-size: 26px;
      color: #999;
    }

    .status {
      margin-top: 16px;
      font-size: 24px;
      color: #999;
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }

  .more {
    position: relative;
    top: 24px;
    left: 640px;
    width: 96px;
    padding-top: 60px;
  }
}
</style>
