<template>
  <div>
    <div class="my_channels">
      <div class="my_channels_top">
        <div class="my_channels_left">
          <span class="my_channels_left_title">我的频道</span>
          <span class="my_channels_left_click_to">(点击进入频道，点击x号删除频道)</span>
        </div>
        <div class="my_channels_right"></div>
      </div>
      <div class="channel_box">
        <channelsTagVue v-for="item in userChannels" :key="item.id" :showTag="item.id === 0 ? false : true"
          @close-tag="closeTag(item.id)" @onClick="toTabs(item.id)">{{ item.name }}</channelsTagVue>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import channelsTagVue from './channelsTag.vue';
import { useStore } from '../../../store';
import { computed } from 'vue';
import { UserChannelsType } from './type'

// const  
const store = useStore()
const emits = defineEmits(['changeTabs'])

// computed
const userChannels = computed(() => {
  return store.homeStore.getUserChannels?.channels
})

// methods
const closeTag = (id: number) => {
  store.homeStore.removeUserChannelsSync(id)
}
const toTabs = (id: number) => {
  emits('changeTabs', id)
}

</script>
<style scoped lang='less'>
.my_channels {
  font-size: 16px;

  .my_channels_top {
    padding-bottom: 5px;
    height: 20px;
    border-bottom: 1px solid #ccc;
  }


  .my_channels_top {
    display: flex;
    justify-content: space-between;

    .my_channels_right {
      width: 50px;
    }

    .my_channels_left_click_to {
      margin-left: 5px;
      font-size: 12px;
      color: #777;
    }
  }
}
</style>