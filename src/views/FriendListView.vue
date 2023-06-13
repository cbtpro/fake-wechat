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

<script setup lang="ts"></script>

<template>
  <van-nav-bar :fixed="true" :border="false" title="通讯录">
    <template #right>
      <van-icon name="friends-o" color="#000" size="20" />
    </template>
  </van-nav-bar>
  <body-container>
    <van-index-bar>
      <van-cell title="新的朋友" />
      <van-cell title="仅聊天的朋友" />
      <van-cell title="群聊" />
      <van-cell title="标签" />
      <van-cell title="公众号" />
      <van-cell title="企业微信联系人" />

      <van-index-anchor index="我的企业" />
      <van-cell title="深圳市税务局移动办税" />

      <van-index-anchor index="A" />
      <van-cell title="阿娟" />
      <van-cell title="阿军" />
      <van-cell title="AI" />

      <van-index-anchor index="B" />
      <van-cell title="白浅" />
      <van-index-anchor index="D" />
      <van-cell title="大B哥" />
      <van-cell title="大哥" />
      <van-index-anchor index="Z" />
      <van-cell title="张霞" />
    </van-index-bar>
  </body-container>
  <body-footer />
</template>

<style lang="less" scoped></style>
