<template>
  <div class="contianer">
    <!-- pull refresh -->
    <van-pull-refresh v-model="pullLoading" @refresh="onRefresh">
      <!-- article list  -->
      <van-list v-model="loading" :immediate-check="false" :finished="finished" offset="1" finished-text="没有更多了"
        @load="onLoad">
        <div class="article van-clearfix" v-for="(item) in articleList.results" :key="item.art_id"
          @click.stop="toDetail(item.art_id)">
          <div class="article_left">
            <div class="article_left_title">{{ item.title }}</div>
            <div class="article_left_img" v-if="item.cover.type !== 0">
              <img class="img_class" v-for="imgItem in item.cover.images" :key="imgItem" :src="imgItem" :alt="imgItem">
            </div>
            <div class="article_left_comment">
              <span class="article_author">{{ item.aut_name }}</span>
              <span class="article_comment_count"> {{ `${item.comm_count} 评论` }}</span>
              <span class="how_long">{{ formatFromNow(item.pubdate) }}</span>
            </div>
          </div>
          <div class="article_right">
            <van-icon name='cross' @click.stop="clickDislike(item.art_id)" />
          </div>
        </div>

      </van-list>

      

    </van-pull-refresh>

    <!-- dislike  -->
    <teleport to="body">
      <van-action-sheet v-model:show="show" cancel-text="取消" :actions="actions" @select="onSelect" />
    </teleport>

    <!-- reports -->
    <teleport to="body">
      <van-action-sheet v-model:show="showReport" cancel-text="返回" :actions="actionsByReport"
        @select="onSelectReport" />
    </teleport>

    <!-- others text -->
    <!-- <van-dialog v-model:show="showTextInput" teleport="#app" title="标题" show-cancel-button>
      </van-dialog> -->

  </div>
</template>
<script lang='ts' setup>
import { reactive, ref, onMounted } from 'vue'
import { useStore } from '../../../store';
import { useRouter } from 'vue-router';
import { formatFromNow } from '@/utils/formatDate'
import { getArticleList } from '../../../api/home';
import { showNotify } from 'vant';
import type { FeedBackFormType, OnSelectType, RootObject } from './type';
import $http from '@axios'

// const
const store = useStore()
const router = useRouter()
const loading = ref(false);
const finished = ref(false);
const pullLoading = ref(false);
const show = ref(false);
const showReport = ref(false)

// const showTextInput = ref(false)
const articleList = reactive<RootObject>({
  pre_timestamp: (new Date()).getTime(),
  results: []
})
const feedBackForm = reactive<FeedBackFormType>({
  target: undefined,
  type: undefined,
  remark: undefined
})
const actions = [
  { name: '不感兴趣', type: 'dislike' },
  { name: '反馈垃圾信息', type: 'report' },
];
const actionsByReport = [
  { name: '其他问题', type: '0' },
  { name: '标题夸张', type: '1' },
  { name: '低俗色情', type: '2' },
  { name: '错别字多', type: '3' },
  { name: '旧闻重复', type: '4' },
  { name: '广告软广', type: '5' },
  { name: '内容不实', type: '6' },
  { name: '涉嫌违法犯罪', type: '7' },
  { name: '侵权', type: '8' }
]

// methods
const reqToGetArticleList = async () => {
  if (loading.value) return
  const json = {
    url: '/v1_0/articles',
    params: {
      channel_id: store.homeStore.getActivePage,
      timestamp: pullLoading.value ? (new Date()).getTime() : articleList.pre_timestamp,
    }
  }
  loading.value = true
  const result = await getArticleList(json)
  if (result.message === 'OK') {
    if (articleList.results.length === 0 || pullLoading.value) {
      articleList.results = result.data.results
    } else {
      articleList.results.push(...result.data.results)
    }
    articleList.pre_timestamp = result.data.pre_timestamp
  }
  if (result.data.pre_timestamp === null) {
    finished.value = true
  }
  loading.value = false
  pullLoading.value = false
}
const onLoad = () => {
  reqToGetArticleList()
}
const onRefresh = () => {
  reqToGetArticleList()
}
const clickDislike = (art_id: number | string) => {
  feedBackForm.target = art_id.toString()
  show.value = true
}
const onSelect = ({ type }: OnSelectType) => {
  if (type === 'dislike') {
    selectEnd('dislike')
  } else {
    showReport.value = true
  }
}
const selectEnd = async (type: string) => {
  const json = {
    url: type === 'dislike' ? '/v1_0/article/dislikes' : '/v1_0/article/reports',
    method: 'post',
    data: feedBackForm
  }
  const result = await $http(json)
  if (result.message === 'OK') {
    // 初始化请求体参数
    feedBackForm.remark = undefined
    feedBackForm.target = undefined
    feedBackForm.type = undefined
    showReport.value = false
    show.value = false
    showNotify({ type: 'success', message: type === 'dislike' ? '操作成功' : '反馈成功', duration: 1000 });
  }
}
const onSelectReport = ({ type }: OnSelectType) => {
  if (type === '0') {
    console.log('其他内容描述');
  }
  feedBackForm.type = type
  selectEnd('report')
}
const toDetail = (id: number | string) => {
  router.push({ name: 'detail', params: { id } })
}

// onMounted
onMounted(() => {
  reqToGetArticleList()

 
})


</script>
<style scoped lang='less'>
.article {
  min-height: 50 px;
  height: auto;
  display: flex;
  padding: 5px 20px;
  border-bottom: 1px solid #ccc;

  .article_left {
    flex: 1;

    .article_left_title {
      font-size: 18px;
      width: 250px;
      height: 30px;
      line-height: 30px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .article_left_img {
      display: flex;
      padding: 5px 0;

      .img_class {
        width: 33%;
        margin-right: 5px;
      }
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

  .article_right {
    width: 50px;
    font-size: 20px;
    margin-left: 20px;
    color: #ccc;
    line-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

  }
}
</style>