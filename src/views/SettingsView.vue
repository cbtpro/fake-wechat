<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goAccountSettings = () => {
  router.push('/settings/account')
}
</script>

<template>
  <van-nav-bar
    :safe-area-inset-top="true"
    :placeholder="true"
    :fixed="true"
    :border="false"
    title="设置"
    left-arrow
    @click-left="$router.back()"
  />
  <body-container>
    <pane-list>
      <pane-list-item @click="goAccountSettings">
        <template #left>
          <van-icon name="manager-o" size="24" />
        </template>
        帐号设置
        <template #right>
          <van-icon name="arrow" size="18" />
        </template>
      </pane-list-item>
    </pane-list>
    <pane-list>
      <pane-list-item>
        <template #left>
          <van-icon name="volume-o" size="24" />
        </template>
        新消息通知
        <template #right>
          <van-icon name="arrow" size="18" />
        </template>
      </pane-list-item>
      <pane-list-item>
        <template #left>
          <van-icon name="eye-o" size="24" />
        </template>
        隐私
        <template #right>
          <van-icon name="arrow" size="18" />
        </template>
      </pane-list-item>
      <pane-list-item>
        <template #left>
          <van-icon name="font-o" size="24" />
        </template>
        通用
        <template #right>
          <van-icon name="arrow" size="18" />
        </template>
      </pane-list-item>
    </pane-list>
  </body-container>
</template>

<style lang="less" scoped></style>
