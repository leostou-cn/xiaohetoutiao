<template>
  <div class="detail_container">
    <div id="content_scroll" @click="hideTextArea">
      <!-- <headerVueVue title="文章详情" :showLeftIcon="true" showLeftText="返回" @onClickBack="onClickBack" /> -->
      <van-loading size="24px" vertical v-if="Object.keys(articleDetail).length === 0">加载中...</van-loading>
      <div v-else class="detail_body">

        <!-- title -->
        <div class="title">{{ articleDetail.title }}</div>

        <!-- author -->
        <div>
          <div class="author">
            <div class="author_box">
              <van-image width="75" height="75" :src="articleDetail.aut_photo" />
              <div class="author_message">
                <span class="author_name">{{ articleDetail.aut_name }}</span>
                <span class="author_po_time">{{ formatFromNow(articleDetail.pubdate) }}</span>
              </div>
            </div>
            <div class="follow" :class="articleDetail.is_followed ? 'is_followed' : ''"
              @click="handleFollow(articleDetail.aut_id, articleDetail.is_followed)">
              {{ articleDetail.is_followed ? '已关注' : '关注' }}
              <van-icon v-if="!articleDetail.is_followed" name="plus" />
            </div>
          </div>
        </div>

        <!-- divider -->
        <van-divider />

        <!-- details -->
        <div class="article_body">
          <!-- <video ref="videoPlayer" class="video-js"></video> -->
          <article class="article_body_detail" v-html="articleDetail.content">
          </article>
        </div>

        <!-- like box -->
        <div class="like_box" @click="changeAttitude(articleDetail.art_id, articleDetail.attitude)">
          <div class="is_like" v-if="articleDetail.attitude === 1">
            <van-button plain round icon="good-job-o"> 已点赞
            </van-button>
          </div>
          <div class="no_attitude" v-else>
            <van-button plain round icon="good-job-o" type="primary"> 点赞
            </van-button>
          </div>
        </div>

        <!-- comment -->
        <articleComment />
      </div>
    </div>

    <!-- to comment -->
    <div class="to_comment">
      <van-icon name="arrow-left" />
      <div class="po_comment" @click="showInput" :class="[comment !== '留下您的观点吧~' ? 'text_color' : '']">{{ comment }}
      </div>
      <van-icon name="chat-o"
        :badge="articleDetail.comm_count ? (articleDetail.comm_count > 99 ? '99+' : articleDetail.comm_count) : ''"
        @click="toCommentArea" />
      <van-icon :name="articleDetail.is_collected ? 'star' : 'star-o'"
        :color="articleDetail.is_collected ? '#0077ff' : ''"
        @click="handleCollected(articleDetail.art_id, articleDetail.is_collected)" />
      <van-icon name="share-o" />
    </div>

    <!-- comment input -->
    <div v-if="showCommentInout" class="comment_input">
      <textarea ref="comment_text" :class="[comment !== '留下您的观点吧~' ? 'text_color' : '']" v-autoFocus
        v-model.trim="comment" placeholder="友善评论、理性发言、阳光心灵"></textarea>
      <van-button type="primary" @click="pushComment(articleDetail.art_id, articleDetail.art_id)">发布</van-button>
    </div>
  </div>
</template>

<script lang='ts' setup name="detailView">
// import headerVueVue from '../../components/headerVue.vue';
import articleComment from './articleComment/articleComment.vue'
import { useRouter, useRoute } from 'vue-router';
import { computed, onMounted, ref, onUnmounted, reactive } from 'vue';
import { showNotify, showNotifyOptions } from 'vant';
import { useStore } from '../../store';
import { formatFromNow } from '@/utils/formatDate'
// import videojs from "video.js"
// import "video.js/dist/video-js.css"
// import objUrl from '@/assets/video/WeChat_20220925202741.mp4'
// import $http from '@/api'

// const 
const router = useRouter()
const route = useRoute()
const store = useStore()
const comment = ref('留下您的观点吧~')
const showCommentInout = ref(false)
const comment_text = ref(null)
const videoPlayer = ref(null)
const myPlayer = ref(null)

// computed
const articleDetail = computed(() => {
  return store.detailStore.getArticleDetail
})

// methods
// const onClickBack = () => {
//   router.go(-1)
// }
const getArticleData = () => {
  store.detailStore.reqGetArticleDetail(route.params.id as string)
}
const handleFollow = async (id: string, is_followed: boolean) => {
  const result = await store.detailStore.reqChangeFollow(id, is_followed)
  let options
  if (result) {
    options = {
      message: is_followed ? '取消关注成功' : '关注成功',
      type: is_followed ? 'warning' : 'primary',
      duration: 1000
    } as showNotifyOptions
  } else {
    options = {
      message: is_followed ? '取消关注失败' : '关注失败',
      type: 'warning',
      duration: 1000
    } as showNotifyOptions
  }
  showNotify(options)
}
const changeAttitude = (id: string, type: number) => {
  store.detailStore.reqChangeAttitude(id, type)
}
const handleCollected = (id: string, type: boolean) => {
  store.detailStore.reqChangeCollected(id, type)
}
const showInput = () => {
  showCommentInout.value = true
  comment.value = ''
}
const toCommentArea = () => {
  document.querySelector('.like_box')?.scrollIntoView({
    behavior: 'smooth'
  })
}
const pushComment = async (target: string, art_id: string) => {
  if (!comment.value) {
    showNotify({
      message: '内容不能为空',
      color: '#000',
      background: '#ccc',
      duration: 1000
    })
    comment_text.value.focus()
  }
  await store.detailStore.reqSendComment({ target, content: comment.value, art_id })
  hideTextArea()
  comment.value = '留下您的观点吧~'
  toCommentArea()
}
const hideTextArea = () => {
  showCommentInout.value = false
  if (!comment.value) {
    comment.value = '留下您的观点吧~'
  }
}

// const paly = () => {
//   myPlayer.value = videojs(videoPlayer.value, {
//     poster: "//vjs.zencdn.net/v/oceans.png",
//     controls: true,
//     loop: false,
//     sources: [
//       {
//         src: objUrl,
//         type: 'video/mp4',
//       }
//     ],
//     controlBar: {
//       remainingTimeDisplay: {
//         displayNegative: false
//       }
//     },
//     playbackRates: [0.5, 1, 1.5, 2]
//   }, () => {
//     myPlayer.value.log("play.....")
//   })
// }

// onMounted
onMounted(() => {
  getArticleData()

})

// onUnmounted
onUnmounted(() => {
  store.detailStore.$reset()
})
</script>
<style scoped lang='less'>
.detail_container {
  padding: 46px 0 80px 0;
  width: 100%;

  .video-js {
    width: 100%;
    height: 266.25px;
    margin: 40px 0;

    /deep/.vjs-big-play-button {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .title {
    padding: 10px 0px;
  }

  .van-loading {
    padding: 100px;

  }

  .detail_body {
    padding: 10px 10px;

    .author {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .author_box {
        display: flex;

        .author_message {
          display: flex;
          flex-direction: column;
          justify-content: end;
          padding-left: 10px;

          .author_name {
            font-size: 14px;
            color: #333;
          }

          .author_po_time {
            font-size: 13px;
            margin-top: 10px;
            color: #666;
          }
        }
      }

      .follow {
        font-size: 14px;
        margin-right: 20px;
        width: auto;
        padding: 5px 10px;
        color: #fff;
        background-color: #0aa5d8;
        border-radius: 30px;

        &.is_followed {
          background-color: #ccc;
        }
      }
    }

    .article_body {
      background-color: #eee;
      padding: 10px;
      border-radius: 20px;

      .article_body_detail {
        width: 100%;
        font-size: 16px;
        line-height: 20px;
        word-break: break-all;

        /deep/ img {
          width: 100%;
        }

        /deep/ pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      }
    }

    .like_box {
      margin: 20px auto;
      text-align: center;
    }
  }

  .to_comment {
    width: 100%;
    height: 46px;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    .po_comment {
      font-size: 14px;
      border: 1px solid #666;
      height: 25px;
      width: 190px;
      line-height: 25px;
      border-radius: 20px;
      text-indent: 1em;
      color: #ccc;
    }
  }

  .comment_input {
    z-index: 9999;
    position: fixed;
    background-color: #fff;
    width: 100%;
    bottom: 0;
    padding: 10px 0;
    border-top: 1px solid #ccc;
    border: 1px solid #ccc;
    border-radius: 20px 20px 0 0;
    font-size: 14px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    textarea {
      width: 75%;
      height: auto;
      min-height: 60px;
      background-color: #eee;
      color: #999;
      resize: none;
      border: 0px;
      line-height: 18px;
      padding: 5px;
      border-radius: 10px;
    }

    .van-button {
      height: 30px;
      border-radius: 10px;
    }
  }

  .text_color {
    color: #000 !important;
  }
}
</style>