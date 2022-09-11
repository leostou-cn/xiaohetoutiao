<template>
  <div class="container">
    <myChannelsVue @changeTabs="changeTabs" />
    <addMoreChannelsVue></addMoreChannelsVue>
  </div>
</template>
<script lang='ts' setup>
import myChannelsVue from './myChannels.vue';
import addMoreChannelsVue from './addMoreChannels.vue';
import { useStore } from '../../../store';
import { onMounted } from 'vue';

// const
const store = useStore()
const emits = defineEmits(['changeTabs'])

// methods
const changeTabs = (id:number) => {
  emits('changeTabs',id)
}

// onMounted
onMounted(() => {
  store.homeStore.reqGetAllChannels()
})

</script>
<style scoped lang='less'>
.container {
  padding-top: 5px;
  padding-left: 5px;
}
</style>