<template>
  <div class="container">
    <div>
      <headerVueVue :showLeftIcon="true" title="编辑用户信息" @onClickBack="goBack" />
      <van-cell center title="头像">
        <template #value>
          <van-image center round width="40" height="40" :src="userProfile.photo" @click="updatePhoto()" />
          <input type="file" accept="image/*" ref="inputRef" v-show="false" @change="photoChange">
        </template>
        <template #right-icon>
          <van-icon name="arrow" />
        </template>
      </van-cell>
      <van-cell center title="昵称" :value="userProfile.name" @click="showDialog('input')">
        <template #right-icon>
          <van-icon name="arrow" />
        </template>
      </van-cell>
      <van-cell center title="生日" :value="userProfile.birthday" @click="showDialog('timePicker')">
        <template #right-icon>
          <van-icon name="arrow" />
        </template>
      </van-cell>
    </div>

    <van-dialog message-align="center" v-model:show="show" :title="dialogContent ? '更换昵称' : '选择您的生日'" show-cancel-button
      :before-close="confirmDialog">
      <input v-autoFocus ref="niNameRef" v-model.trim="newNiName" v-show="dialogContent" type="text" />
      <van-date-picker ref="datePickerRef" v-model="currentDate" v-show="!dialogContent" title="选择日期"
        :min-date="minDate" :max-date="maxDate">
        <template #cancel>
        </template>
        <template #confirm>
        </template>
      </van-date-picker>
    </van-dialog>
  </div>
</template>
<script lang='ts' setup>
import { computed, onMounted, ref, watch } from 'vue';
import { showNotify } from 'vant'
import { useRouter } from 'vue-router';
import { useStore } from '../../../store';
import headerVueVue from '../../../components/headerVue.vue';
import { formatYMD } from '../../../utils/formatDate'

// const
const store = useStore()
const router = useRouter()
const inputRef = ref('inputRef')
const niNameRef = ref('niNameRef')
const show = ref(false);
const currentDate = ref(['2022', '01', '01']);
const dialogContent = ref(false)
const newNiName = ref('')
const maxDate = new Date()
const minDate = new Date(1900, 1, 1)
const datePickerRef = ref(null)

// computed
const userProfile = computed(() => {
  return store.userStore.getUserProfile
})



// methods
const updatePhoto = () => {
  inputRef.value.click()
}
const goBack = () => {
  router.go(-1)
}
const autoFocus = () => {
  niNameRef.value.focus()
}
const initDate = (date: string) => {
  currentDate.value = formatYMD(date)
}
const showDialog = (type: string) => {
  if (type === 'input') {
    dialogContent.value = true
    newNiName.value = userProfile.value.name
    setTimeout(() => {
      autoFocus()
    }, 0)
  } else {
    dialogContent.value = false
  }
  show.value = true
}

const confirmDialog = (action: string) => {
  if (action !== 'confirm') {
    return true
  }
  // 昵称dialog
  if (dialogContent.value) {
    const reg = /[\u4e00-\u9fa5_a-zA-Z0-9_]{4,10}/
    if (newNiName.value === userProfile.value.name) {
      return true
    }
    if (!reg.test(newNiName.value)) {
      showNotify({
        type: 'warning',
        message: '只能输入4-9位字符'
      })
      autoFocus()
      return false
    }
    if (newNiName.value)
      store.userStore.reqUpdateUserProfile({ name: newNiName.value })
    return true
  } else {
    // 生日 dialog
    const birthday = currentDate.value.join('-')
    store.userStore.reqUpdateUserProfile({ birthday })
    return true
  }
}

const photoChange = (e: any) => {
  if (e.target.files.length === 0) return
  const file = e.target.files[0]
  store.userStore.reqUpdatePhoto(file)
}

// onMounted
onMounted(() => {
  store.userStore.reqGetUserProfile() 
  watch(userProfile, (newVal, oldVal) => {
    initDate(newVal.birthday as string)
  })
})

</script>
<style scoped lang='less'>
.container {
  padding-top: 46px;
}

/deep/.van-dialog__content {
  text-align: center;

  input {
    border: 0;
  }
}
</style>