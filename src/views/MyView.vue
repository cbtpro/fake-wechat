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

</script>

<template>
  <van-nav-bar :safe-area-inset-top="true" :placeholder="true" :fixed="true" :border="false" title="我的" />
  <body-container>
    <my-profile />
  </body-container>
  <body-footer />
</template>

<style lang="less" scoped></style>
