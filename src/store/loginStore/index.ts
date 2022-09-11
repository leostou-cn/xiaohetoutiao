import { defineStore } from 'pinia'
export default defineStore('loginStore', {
  state: () => {
    return {
      loginData: {},
    }
  },
  actions: {
    setLoginData(data: any) {
      this.loginData = data
    }
  },
  getters: {
    getLoginData(state) {
      return state.loginData
    }
  }
})