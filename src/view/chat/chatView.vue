<template>
  <div class="container">
    <headerVueVue title="小思同学" :show-left-icon="true" @on-click-back="goBack" />

    <!-- chat -->
    <div class="chat_box">

      <!-- chat list -->
      <div class="chat_box_item" :class="item.name !== 'me' ? 'left' : 'right'" v-for="item in chatList"
        :key="item.msg">
        <van-image v-if="item.name !== 'me'" width="50" height="50"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        <div class="chat_content">{{ item.msg }}</div>
        <van-image v-if="item.name === 'me'" width="50" height="50" :src="userInfo.photo" @click="toUser" />
      </div>
    </div>

    <!-- input -->
    <div class="input_box">
      <textarea type="text" rows="1" v-model="message"></textarea>
      <van-button type="primary" @click="sendMessage">发送</van-button>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { onMounted, ref, computed, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../../store';
import headerVueVue from '../../components/headerVue.vue';

// const 
const router = useRouter()
const store = useStore()
const message = ref('')

// computed
const chatList = computed(() => {
  return store.chatStore.getChatList
})
const socket = computed(() => {
  return store.chatStore.getSocket
})
const userInfo = computed(() => {
  return store.userStore.getUserInfo
})
const scrollToView = () => {
  nextTick(() => {
    const lastTextEl = document.querySelector('.chat_box>.chat_box_item:last-child .chat_content')
    lastTextEl?.scrollIntoView({
      behavior:'smooth'
    })
  })


}

// methods
const goBack = () => {
  router.go(-1)
}
const toUser = () => {
  router.push({ name: 'user' })
}
const sendMessage = () => {
  if (!message.value) return
  socket.value.emit('message', {
    msg: message.value,
    timestamp: new Date().getTime()
  })
  store.chatStore.upDataChatList({
    name: 'me',
    msg: message.value
  })

  message.value = ''
}

// onMounted
onMounted(() => {
  store.chatStore.initSocket()
})

watch(chatList, (newValue, oldValue) => {
  scrollToView()
}, {
  deep: true
})

</script>
<style scoped lang='less'>
.container {
  padding-top: 46px;

  .chat_box_item {
    display: flex;
    align-items: center;
    font-size: 18px;

    .van-image {
      border-radius: 10px;
      margin: 10px 20px 5px 20px;
      overflow: hidden;
    }

    &.right {
      justify-content: flex-end;

      .chat_content::after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        right: -20px;
        border: 10px solid transparent;
        border-left: 10px solid #e0effb;
      }

    }

    &.left {
      .chat_content::after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        left: -20px;
        border: 10px solid transparent;
        border-right: 10px solid #e0effb;
      }
    }

    .chat_content {
      position: relative;
      border-radius: 10px;
      background-color: #e0effb;
      padding: 10px;
      max-width: 60vw;
      line-height: 24px;
    }
  }

  .input_box {
    position: fixed;
    display: flex;
    width: 100vw;
    bottom: 0;
    min-height: 46px;
    background-color: #ccc;
    justify-content: space-around;
    align-items: center;

    textarea {
      display: block;
      resize: none;
      margin: 10px 0;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 100px;
      width: 240px;
      font-size: 14px;
      max-height: 150px;
    }
  }
}
</style>