<template>
  <div class="container">
    <!-- header -->
    <headerVueVue title="" :showLeftIcon="true" @onClickBack="onClickBack">
      <template #middleBar>
        <van-search v-autoFocus class="search_input_box" v-model.trim="searchKeyWord" placeholder="请输入搜索关键词"
          @input="onInput" @search="toResult" />
      </template>
    </headerVueVue>

    <!-- suggestion -->
    <suggestionView v-if="showType === 'sugSearch'" @getSearchData="getSearchData" />

    <!-- search history -->
    <searchHistoryVue v-if="showType === 'history'" @historySearch="getSearchData" />

    <!-- search result -->
    <searchResultVue v-if="showType === 'result'" @loadMore="loadMore" />

  </div>
</template>
<script lang='ts' setup>
import headerVueVue from '../../components/headerVue.vue';
import suggestionView from './suggestionView.vue'
import searchHistoryVue from './searchHistory.vue';
import searchResultVue from './searchResult.vue';
import { useRouter } from 'vue-router';
import { useStore } from '../../store';
import { ref, computed, watch } from 'vue';

// const 
const router = useRouter()
const store = useStore()
const searchKeyWord = ref<string>('')
const timer = ref()

// computed
const showType = computed(() => {
  return store.searchStore.getShowType
})

// methods
const onClickBack = () => {
  searchKeyWord.value = ''
  store.searchStore.clearResultData()
  if (showType.value === 'history') {
    router.go(-1)
  }
  if (showType.value === 'sugSearch') {
    store.searchStore.changeShowType('history')
  }
  if (showType.value === 'result') {
    if (store.searchStore.getSugSearchData.length !== 0) {
      store.searchStore.changeShowType('sugSearch')
    } else {
      store.searchStore.changeShowType('history')
    }
  }
}
const getSearch = async () => {
  if (!searchKeyWord.value.length) return
  store.searchStore.reqGetSugSearchData(searchKeyWord.value)
}
const onInput = () => {
  if (timer.value) clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    getSearch()
  }, 500)
}
const getSearchData = (data: string) => {
  searchKeyWord.value = data
  store.searchStore.reqGetSearchData(data)
}
const toResult = async () => {
  store.searchStore.reqGetSearchData(searchKeyWord.value)
  store.searchStore.clearSugSearchData()
}
const loadMore = () => {
  toResult()
}

watch(searchKeyWord, (newValue, oldValue) => {
  if (newValue === '') {
    store.searchStore.changeShowType('history')
    store.searchStore.clearResultData()
  }
}, {
  immediate: true
})

</script>
<style scoped lang='less'>
.container {
  padding-top: 46px;

  .search_input_box {
    height: 30px;
    border-radius: 30px;
    color: #333;
    font-size: 14px;
  }
}
</style>