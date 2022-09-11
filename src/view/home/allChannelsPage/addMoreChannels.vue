<template>
  <div>
    <div class="more_title">
      点击添加更多频道:
    </div>
    <channelsTagVue v-for="item in filterUserChannels" :show-tag="false" :key="item.id" @onClick="onClick(item.id)">{{
        item.name
    }}</channelsTagVue>
  </div>
</template>
<script lang='ts' setup>
import channelsTagVue from './channelsTag.vue';
import { useStore } from '@/store/index.ts'
import { computed } from 'vue'
// const
const store = useStore()

// computed
const filterUserChannels = computed(() => {
  return store.homeStore.filterUserChannels
})

// methods
const onClick = (id: number) => {
  store.homeStore.addUserChannels(id)
}


</script>
<style scoped lang='less'>
.more_title {
  font-size: 16px;
  padding:0 5px;
  height: 20px;
  border-bottom: 1px solid #ccc;

  .more_top {
    display: flex;
    justify-content: space-between;
  }
}
</style>