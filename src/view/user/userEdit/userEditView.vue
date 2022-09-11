<template>
  <div class="container">
    <div>
      <headerVueVue :showLeftIcon="true" title="编辑用户信息" @on-click-back="goBack" />
      <van-cell center title="头像">
        <template #value>
          <van-image center round width="40" height="40" :src="userProfile.photo" @click="updatePhoto()" />
          <input type="file" accept="image/*" ref="inputRef" v-show="false" @change="photoChange">
        </template>
        <template #right-icon>
          <van-icon name="arrow" />
        </template>
      </van-cell>
      <van-cell center title="昵称" :value="userProfile.name" @click="showDialog">
        <template #right-icon>
          <van-icon name="arrow" />
        </template>
      </van-cell>
      <van-cell center title="生日" :value="userProfile.birthday">
        <template #right-icon>
          <van-icon name="arrow" />
        </template>
      </van-cell>
    </div>

    <van-dialog v-model:show="show" title="标题" show-cancel-button>
      <img src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" />
    </van-dialog>
  </div>
</template>
<script lang='ts' setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../../../store';
import headerVueVue from '../../../components/headerVue.vue';

// const
const store = useStore()
const router = useRouter()
const inputRef = ref('inputRef')
const show = ref(false);

// computed
const userProfile = computed(() => {
  return store.userStore.userProfile
})

// methods
const updatePhoto = () => {
  inputRef.value.click()
}
const goBack = () => {
  router.go(-1)
}
const showDialog = () => {
  show.value = true
}

const photoChange = (e: any) => {
  if (e.target.files.length === 0) return
  const file = e.target.files[0]
  store.userStore.reqUpdatePhoto(file)
}

// onMounted
onMounted(() => {
  store.userStore.reqGetUserProfile()
})

</script>
<style scoped lang='less'>
.container {
  padding-top: 46px;
}
</style>