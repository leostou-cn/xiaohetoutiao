<template>
  <div class="container">
    <!-- channle tab -->
    <van-tabs v-model:active="active" sticky offset-top="1.2267rem" >
      <van-tab v-for="(item) in allChannels" :key="item.id" :name="item.id" :title="item.name">
        <!-- <keep-alive> -->
          <articlePageVue />
        <!-- </keep-alive> -->
      </van-tab>
    </van-tabs>

    <!-- edit channel -->
    <van-icon @click="toEditChannels" class="plus_icon" name="plus" />

    <!-- allChannels page -->
    <van-popup class="edit_channels_class" v-model:show="showAllChannels" teleport="body" duration="0">
      <headerVueVue :showLeftIcon="true" @onClickBack="clickBack" />
      <allChannelsPage @changeTabs="toChangeTabs" />
    </van-popup>
  </div>
</template>

<script lang='ts' setup>
import articlePageVue from './articlePage/articlePage.vue';
import allChannelsPage from './allChannelsPage/allChannels.vue'
import headerVueVue from '../../components/headerVue.vue';
import { useStore } from '@/store/index'
import { computed, onMounted, ref } from 'vue'
import { TabProps } from 'vant'

// const 
const store = useStore()
const showAllChannels = ref(false)

// computed
const allChannels = computed(() => {
  return store.homeStore.getUserChannels.channels || []
})
const active = computed(() => {
  return store.homeStore.getActivePage
})

// methods
const toEditChannels = () => {
  showAllChannels.value = true
}
const clickBack = () => {
  showAllChannels.value = false
}
const toChangeTabs = (id: number) => {
  showAllChannels.value = false
  store.homeStore.changActivePage(id)
}

// onMounted
onMounted(async () => {
  store.homeStore.reqGetUserChannels()
})
</script>
<style scoped lang='less'>
.container {
  margin-top: 46px;

  /deep/.van-tabs__nav {
    padding-right: 31px;
  }

  /deep/.van-tabs__line {
    background-color: #0077ff;
  }

  .plus_icon {
    position: fixed;
    top: 50px;
    right: 0;
    background-color: #fff;
    height: 30px;
    width: 30px;
    border-left: 1px solid #ccc;
    text-align: center;
    line-height: 30px;
    font-size: 18px;
    z-index: 999;
  }


}
</style>

<style lang="less">
.edit_channels_class {
  height: 100%;
  width: 100%;
}
</style>