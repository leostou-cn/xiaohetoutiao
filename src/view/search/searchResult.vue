<template>
  <div>
    <div v-if="resultList">
      <van-list v-model="loading" :immediate-check="false" :finished="finished" offset="1" finished-text="没有更多了"
        @load="onLoad">
        <div class="search_result" v-for="(item) in resultList" :key="item.art_id" @click="toDetail(item.art_id)">
          <div class="article_left">
            <div class="article_left_title">{{ item.title }}</div>
            <div class="article_left_comment">
              <span class="article_author">{{ item.aut_name }}</span>
              <span class="article_comment_count"> {{ `${item.comm_count} 评论` }}</span>
              <span class="how_long">{{ formatFromNow(item.pubdate) }}</span>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <van-empty v-else image="search" description="暂无数据" />
  </div>
</template>
<script lang='ts' setup>
import { useStore } from '../../store';
import { useRouter } from 'vue-router';
import { computed, nextTick, ref } from 'vue';
import { formatFromNow } from '../../utils/formatDate';

// const 
const store = useStore()
const router = useRouter()
const emits = defineEmits(['loadMore'])
const loading = ref(false)

// computed
const resultList = computed(() => {
  return store.searchStore.getSearchResult
})
const finished = computed(() => {
  return store.searchStore.getFinished
})

// methods
const onLoad = () => {
  if (store.searchStore.getFinished) return
  emits('loadMore')
  nextTick(() => {
    loading.value = false
  })
}
const toDetail = (id: number | string) => {
  router.push({ name: 'detail', params: { id } })
}
</script>

<style scoped lang='less'>
.search_result {
  min-height: 50 px;
  height: auto;
  display: flex;
  padding: 5px 20px;
  border-bottom: 1px solid #ccc;

  .article_left {
    flex: 1;

    .article_left_title {
      font-size: 16px;
      width: 350px;
      height: 30px;
      line-height: 30px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .article_left_comment {
      font-size: 12px;
      color: #ccc;
      display: flex;
      flex-direction: row;

      span {
        display: block;
        overflow: hidden;
        margin-right: 5px;
        white-space: nowrap;
        text-overflow: ellipsis;

        &.article_author {
          width: 60px;
        }
      }
    }
  }
}
</style>