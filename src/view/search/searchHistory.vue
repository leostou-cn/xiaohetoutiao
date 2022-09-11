<template>
  <div>
    <div v-if="historyList.length !== 0">
      <div class="top">
        <div class="top_left">搜索记录</div>
        <van-icon name="delete" @click="clearHistory" />
      </div>
      <div class="bottom" :key="refreshBottomKey">
        <div class="history_box" v-for="item in historyList" :key="item" @click="toSearchResult(item)">{{ item }}</div>
      </div>
    </div>

    <van-empty v-else description="无历史记录" />
  </div>
</template>
<script lang='ts' setup>
import { localSearch } from '../../utils/localSearch'
import { Dialog } from 'vant';
import { useStore } from '../../store';
import { computed, ref, onMounted } from 'vue';

// const 
const emits = defineEmits(['historySearch'])
const store = useStore()
const refreshBottomKey = ref(new Date().getTime())
const historyList = ref([])

// methods
const clearHistory = () => {
  Dialog.confirm({
    title: '删除历史记录',
    message: '删除历史记录后无法恢复'
  }).then(() => {
    localSearch({
      type: 'delete'
    })
    refreshBottomKey.value = new Date().getTime()
    reFreshHistoryList()
  })
}
const toSearchResult = (data: string) => {
  emits('historySearch',data)
  store.searchStore.clearSugSearchData()
}

const reFreshHistoryList=() => {
  historyList.value = localSearch({
    type:'get'
  })
}

// onMounted
onMounted(() => {
  reFreshHistoryList()
})

</script>
<style scoped lang='less'>
.top {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  padding: 10px 10px 20px 10px;
}
.bottom {
  .history_box {
    display: inline-block;
    padding: 10px 15px;
    margin: 5px 10px;
    width: auto;
    font-size: 14px;
    border-radius: 10px;
    background-color: #eee;
  }
}
</style>