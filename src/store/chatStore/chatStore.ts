import { defineStore } from "pinia";
import { io } from 'socket.io-client'
import type { chatStoreType, UpDataChatListType } from './type'
import getToken from "../../utils/getToken";

export default defineStore('chatStore', {
  state: () => {
    return {
      socket: '',
      chatList: [{
        name: 'xs',
        msg: 'Hi,你好！这里是傻篮子'
      }]
    } as chatStoreType
  },
  actions: {
    initSocket() {
      this.socket = io('http://toutiao.itheima.net', {
        query: {
          token: getToken() as string
        },
        transports: ['websocket'],
        timeout: 5000
      })

      this.socket.on('connect', () => {
        console.log('socket.io-connect')
      })
      this.socket.on('message', (obj: UpDataChatListType) => {
        console.log(obj);
        this.chatList.push({
          name: 'xs', msg: obj.msg
        })
      })
    },
    upDataChatList(obj: UpDataChatListType) {
      this.chatList.push(obj)
    }
  },
  getters: {
    getSocket(state) {
      return state.socket
    },
    getChatList(state) {
      return state.chatList
    }
  }
})