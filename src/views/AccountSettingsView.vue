<script setup lang="ts">
import { useRouter } from 'vue-router'
import { showToast, showConfirmDialog } from 'vant'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const goProfile = () => {
  router.push('/settings/profile')
}

const handleLogout = () => {
  showConfirmDialog({
    title: '退出登录',
    message: '确定要退出登录吗？',
  })
    .then(() => {
      authStore.clearAuthInfo()
      showToast('已退出登录')
      router.push('/sign-in')
    })
    .catch(() => {})
}
</script>

<template>
  <van-nav-bar
    :safe-area-inset-top="true"
    :placeholder="true"
    :fixed="true"
    :border="false"
    title="帐号设置"
    left-arrow
    @click-left="$router.back()"
  />
  <body-container>
    <pane-list>
      <pane-list-item>
        <template #left>
          <van-icon name="lock" size="24" />
        </template>
        帐号与安全
        <template #right>
          <van-icon name="arrow" size="18" />
        </template>
      </pane-list-item>
    </pane-list>
    <pane-list>
      <pane-list-item @click="goProfile">
        <template #left>
          <van-icon name="user-circle-o" size="24" />
        </template>
        个人信息
        <template #right>
          <van-icon name="arrow" size="18" />
        </template>
      </pane-list-item>
    </pane-list>
    <pane-list>
      <div class="logout">
        <van-button block type="danger" plain @click="handleLogout">
          退出登录
        </van-button>
      </div>
    </pane-list>
  </body-container>
</template>

<style lang="less" scoped>
.logout {
  padding: 24px;
}
</style>
