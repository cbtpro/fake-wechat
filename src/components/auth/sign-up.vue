<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showNotify } from 'vant'
import { useNetwork } from '@/network'
import Captcha from './captcha.vue'

const disabled = ref(false)
const username = ref('')
const nickname = ref('');
const password = ref('')
const captcha = ref('')
const captchaId = ref('')

const captchaRef = ref<InstanceType<typeof Captcha>>()
const router = useRouter()

const signUp = (user: ISignUpUser & { captcha: string; captchaId: string }) => {
  const { request } = useNetwork()

  return new Promise<IResponseBody<ISignUpUser>>((resolve, reject) => {
    request<ISignUpUser>({
      url: '/auth/register',
      method: 'POST',
      data: user,
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

const onSubmit = async (values: ISignUpUser & { captcha: string }) => {
  try {
    const user = await signUp({
      ...values,
      captchaId: captchaId.value,
    });
    console.log(user);
    showNotify({
      type: 'success',
      message: '注册成功！',
    })
    router.push({
      path: '/sign-in',
    });
  } catch (error) {
    console.error(error);
    const message = (error as any).message;
    showNotify({
      type: 'danger',
      message,
    })
    captchaRef.value?.refreshCaptcha()
  }
}
</script>

<template>
  <div class="container">
    <div class="header">
      <van-image
        width="100"
        height="100"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        class="avatar"
      />
    </div>
    <div class="form">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            :rules="[{ required: true, message: '请填写用户名' }]"
            name="username"
            label="用户名"
            placeholder="用户名"
            autocomplete="username"
          />
          <van-field
            v-model="nickname"
            :rules="[{ required: true, message: '请填写昵称' }]"
            name="nickname"
            label="昵称"
            placeholder="昵称"
            autocomplete="nickname"
          />
          <van-field
            v-model="password"
            :rules="[{ required: true, message: '请填写密码' }]"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            autocomplete="current-password"
          />
          <van-field
            v-model="captcha"
            :rules="[{ required: true, message: '请填写验证码' }]"
            name="captcha"
            label="验证码"
            placeholder="验证码"
          >
            <template #button>
              <Captcha ref="captchaRef" @update:captcha-id="(val) => captchaId = val" />
            </template>
          </van-field>
        </van-cell-group>
        <div class="footer">
          <van-button
            :disabled="disabled"
            block
            type="success"
            native-type="submit"
          >
            注册
          </van-button>
          <van-button
            plain
            hairline
            type="default"
            @click="router.push('/sign-in')"
          >
            已有账号？去登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 750px;
  .header {
    width: 750px;
    .avatar {
      margin-top: 200px;
      left: 275px;
    }
  }
  .form {
    width: 100%;
    margin-top: 60px;
    .avatar {
      margin: 40px auto;
    }
  }
  .footer {
    margin: 40px auto 0px;
    width: 600px;
  }
}
</style>
