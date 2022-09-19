<template>
  <div>
    <!-- comment -->
    <van-list :immediate-check="false" v-model:loading="loading" offset="1" :finished="finished" finished-text="没有更多了"
      @load="onLoad">
      <div class="comment" v-for="item in commentData" :key="item.com_id">
        <div class="comment_top">
          <div class="comment_top_left">
            <div class="comment_user_photo">
              <van-image width="50" height="50" :src="item.aut_photo" />
            </div>
            <div class="comment_user_name">{{ item.aut_name }}</div>
          </div>
          <div class="comment_top_right" @click="likeComment(item.com_id, item.is_liking, item)">
            <van-icon color="red" name="like" v-if="item.is_liking" />
            <van-icon name="like-o" v-else />
          </div>
        </div>
        <div class="comment_content">{{ item.content }}</div>
        <div class="comment_ago">{{ formatFromNow(item.pubdate) }}</div>
      </div>
    </van-list>

  </div>
</template>
<script lang='ts' setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '../../../store';

import { formatFromNow } from '../../../utils/formatDate';
import { showNotify } from 'vant';

// const 
const store = useStore()
const route = useRoute()
const loading = ref(false)

// computed
const commentData = computed(() => {
  return store.detailStore.getCommentData
})
const finished = computed(() => {
  return store.detailStore.getFinished
})

// methods
const likeComment = async (target: string, type: boolean, item: object) => {
  const result = await store.detailStore.reqLikeComment({ target, type })
  if (result) {
    item.is_liking = item.is_liking ? false : true
  } else {
    showNotify({
      message: '操作失败',
      background: '#ccc',
      color: '#000',
      duration: 1000
    })
  }

}
const onLoad = async () => {
  await store.detailStore.reqGetCommentData({ type: 'a', source: route.params.id as string })
  loading.value = false
}
</script>
<style scoped lang='less'>
.comment {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;

  .comment_top {
    display: flex;
    padding-bottom: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .comment_top_left {
      display: flex;
      align-items: center;

      .comment_user_name {
        margin-left: 10px;
      }
    }

    .comment_top_right {
      font-size: 24px;
    }
  }

  .comment_content {
    margin: 10px 0;
    text-indent: 2em;
  }

  .comment_ago {
    color: #ccc;
  }
}
</style>