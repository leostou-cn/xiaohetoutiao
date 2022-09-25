<template>
  <van-tabbar v-model="active" @change="handleChang">
    <van-tabbar-item name="home" :to="{ name: 'home' }" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item name="friends" :to="{ name: 'user' }" icon="friends-o">个人</van-tabbar-item>
    <van-tabbar-item name="scroll" :to="{ name: 'scroll' }" icon="friends-o">滚动</van-tabbar-item>
    <van-tabbar-item name="video" :to="{ name: 'video' }" icon="play-circle-o">播放</van-tabbar-item>
  </van-tabbar>
</template>
<script lang='ts' setup>
import { ref, onMounted } from 'vue';
// const
const active = ref('test');

// emits
const emits = defineEmits(['getBar'])

// methods
const handleChang = (data: number | string) => {
  emits('getBar', data)
}
// onMounted
onMounted(() => {
  emits('getBar', active.value)
})



</script>
<style scoped lang='less'>

</style>
