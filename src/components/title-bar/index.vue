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

<template>
  <div class="container">
    <div class="left">
      <icon-font iconName="icon-left" className="icon-left arrow-left"></icon-font>
    </div>
    <div class="title">标题</div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="postcss" scoped>
.container {
  width: 375px;
  height: 44px;
  font-family: "阿里巴巴普惠体 2.0 35 Thin";
  .left {
    .arrow-left {
      width: 64px;
      height: 64px;
    }
  }
  .center {
    font-size: 17px;
    font-weight: 400;
    color: rgba(0,0,0,0.9);
    line-height: 24px;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
