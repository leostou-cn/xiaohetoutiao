<template>
  <div>

    <!-- header -->
    <headerVueVue title="小何头条-登录" />

    <!-- login form -->
    <van-form @submit="onSubmit" ref="loginFormRef">
      <van-cell-group inset>
        <van-field required v-model="username" autocomplete="false" name="mobile" label="用户名"
          placeholder="用户名/手机号码/邮箱账号" :rules="validRules.username" />
        <van-field required v-model="password" autocomplete="false" type="password" name="code" label="密码"
          placeholder="密码" :rules="validRules.password" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button :disabled="isLogining" round block type="primary" native-type="submit">
          {{ isLogining ? `发送短信中(${timeCount}S)` : '登录' }}
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script lang='ts' setup>
import headerVueVue from '../../components/headerVue.vue';
import { ref, reactive, watch } from 'vue';
import { ValidType } from './type'
import type { FormInstance } from 'vant';
import { useRouter } from 'vue-router';
import { postLogin } from '@/api/loginApi/index';
import { useStore } from '@/store/index'
import { Notify } from 'vant';
// const
const router = useRouter();
const store = useStore()
const username = ref('17707734316');
const password = ref('246810');
let timeCount = ref(3)
let timer = ref()
const isLogining = ref(false)
const loginFormRef = ref<FormInstance>()
const validRules = reactive({
  username: [
    { required: true, message: '请填写用户名' },
    { pattern: /[A-Za-z0-9]{6,16}/, message: '用户名长度在6-16位，且只能包含字母和数字' },
  ],
  password: [
    { required: true, message: '请填写密码' },
    { pattern: /[A-Za-z0-9]{6,16}/, message: '密码长度在6-16位，且只能包含字母和数字' },
  ]
})

// methods
const onSubmit = async (value: ValidType) => {
  const json = {
    url: '/v1_0/authorizations',
    method: 'post',
    data: value
  }
  try {
    isLogining.value = true
    const result = await postLogin(json)
    if (result?.message === 'OK') {
      window.localStorage.setItem('token', result.data.token)
      store.loginStore.setLoginData(result.data)
      Notify({
        type: 'success',
        message: '登陆成功',
        duration: 1000
      })
      setTimeout(() => {
        router.replace({ name: 'home' })
      }, 1000)
    }
  } catch (error) {
    Notify({
      type: 'danger',
      message: '登陆失败'
    })
  }
}
const setTimer = () => {
  timer.value = setInterval(() => {
    if (timeCount.value === 0) {
      clearInterval(timer.value)
      isLogining.value = false
    }
    timeCount.value--
  }, 1000)
}

// watch
watch(isLogining, (newValue, oldValue) => {
  if (newValue) {
    setTimer()
  }
  if (oldValue) {
    timeCount.value = 3
  }
})
</script>
<style scoped lang='less'>

  .van-form{
    padding-top: 46px;
  }
</style>