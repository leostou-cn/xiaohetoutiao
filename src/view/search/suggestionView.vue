<template>
  <div>
    <div class="sugList" v-for="item in sugSearchData" :key="item" @click="clickSearch(item)">
      <div class="result" v-html="renderHighLight(item, highLightValue)">
      </div>
    </div>
    <van-empty image="search" v-if="sugSearchData[0] === null || sugSearchData.length === 0" description="暂无数据" />
  </div>
</template>
<script lang='ts' setup>
import { useStore } from '../../store';
import { computed } from 'vue';

// const 
const store = useStore()
const emits = defineEmits(['getSearchData'])

// computed
const sugSearchData = computed(() => {
  return store.searchStore.getSugSearchData
})
const highLightValue = computed(() => {
  return store.searchStore.getHighLightValue
})

// methods
const clickSearch = (item: string) => {
  emits('getSearchData', item)
}
const renderHighLight = (target: string, value: string) => {
  const reg = new RegExp(value, 'gi')
  if (target) {
    return target.replace(reg, (r1) => {
      return `<span style='color:red'>${r1}</span>`
    })
  }
}
</script>
<style scoped lang='less'>
.sugList {
  height: 30px;
  margin: 10px 10px;

  .result {
    line-height: 30px;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
    font-weight: 600;
  }

}
</style>