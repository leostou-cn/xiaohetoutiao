import { defineStore } from 'pinia'
import loginStore from './loginStore/index'
import homeStore from './homeStore'
import searchStore from './search'
import detailStore from './detail'
import userStore from './user/userStore'
import chatStore from './chatStore/chatStore'

export const useStore = defineStore('store', {
  state: () => {
    return {
      loginStore: loginStore(),
      homeStore: homeStore(),
      searchStore: searchStore(),
      detailStore: detailStore(),
      userStore: userStore(),
      chatStore: chatStore()
    }
  }
})