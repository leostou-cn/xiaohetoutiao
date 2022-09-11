<template>
  <div class="container">
    <div class="top">
      <div class="top_user">
        <div class="top_user_photo">
          <van-image round width="75" height="75" :src="userInfo.photo" />
        </div>
        <div class=" top_user_info">
          <div class="top_user_info_name">{{ userInfo.name }}</div>
          <van-tag type="primary" class="top_user_info_authentication">申请认证</van-tag>
        </div>
      </div>
      <div class="top_data">
        <div class="top_data_share flex">
          <div class="top_data_count">{{ userInfo.art_count }}</div>
          <div class="top_data_text">动态</div>
        </div>
        <div class="top_data_follow flex">
          <div class="top_data_count">{{ userInfo.follow_count }}</div>
          <div class="top_data_text">关注</div>
        </div>
        <div class="top_data_fans flex">
          <div class="top_data_count">{{ userInfo.fans_count }}</div>
          <div class="top_data_text">粉丝</div>
        </div>
      </div>
    </div>
    <div class="bot_operation">
      <van-cell v-for="item in cellListMap" :key="item.title" size="large" :title="item.title" :icon="item.icon"
        @click="handleCell(item.name)">
        <template #right-icon>
          <van-icon name="arrow" size="0.64rem" />
        </template>
      </van-cell>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { onMounted, computed } from 'vue';
import { useStore } from '../../store';
import { Dialog } from 'vant';
import { useRouter } from 'vue-router';
import type { CellFnMapType } from './type'
import deleteToken from '../../utils/deleteToken';

// const 
const store = useStore()
const router = useRouter()
const cellListMap = [{
  name: 'edit',
  title: '编辑资料',
  icon: 'edit',
}, {
  name: 'chat',
  title: '小思同学',
  icon: 'chat-o'
}, {
  name: 'logout',
  title: '退出登录',
  icon: 'info-o'
}]
const cellFnMap: CellFnMapType = {
  'edit': () => {
    router.push({ name: 'user_edit' })
  },
  'logout': () => {
    Dialog.confirm({
      title: '退出登录',
      message: '是否确认退出登录',
      showCancelButton: true
    }).then(() => {
      deleteToken()
      router.push({ name: 'login' })
    }).catch(err => {
      console.log(err);
    })
  }
}

// computed
const userInfo = computed(() => {
  return store.userStore.getUserInfo
})
const handleCell = (name: string) => {
  cellFnMap[name]()
}

// onMounted
onMounted(() => {
  store.userStore.reqGetUserInfo()
})
</script>
<style scoped lang='less'>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .top {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #0077ff;
    padding: 45px 20px;

    .top_user {
      display: flex;
      margin-bottom: 30px;

      .top_user_info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 16px;
        padding: 10px;

        .top_user_info_name {
          color: #FFF;
          font-weight: 700;
        }

        .top_user_info_authentication {
          display: flex;
          width: 56px;
          font-size: 14px;
          line-height: 16px;
          background-color: #fff;
          color: #0077ff;
          padding: 4px 5px;
          border-radius: 4px;
        }
      }
    }

    .top_data {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      color: #fff;
      font-size: 16px;
    }

    .flex {
      display: flex;
      flex-direction: column;
      align-items: center;

      .top_data_count {
        padding-bottom: 10px;
      }
    }
  }

  .bot_operation {}
}
</style>