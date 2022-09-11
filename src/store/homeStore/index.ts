import { defineStore } from 'pinia'
import $http from '@axios'
export default defineStore('homeStore', {
  state: () => {
    return {
      userChannels: {
        channels: []
      },
      activePage: 0,
      allChannels: []
    }
  },
  actions: {
    async reqGetUserChannels() {
      const json = {
        url: '/v1_0/user/channels',
      }
      try {
        const result = await $http(json)
        if (result.message === 'OK') {
          this.userChannels = result.data
        }
      } catch (error) {
        console.log(error);
      }
    },
    changActivePage(number: number) {
      this.activePage = number
    },
    async reqGetAllChannels() {
      const json = {
        url: '/v1_0/channels'
      }
      const result = await $http(json)
      if (result.message === 'OK') {
        this.allChannels = result.data.channels
      }
    },
    async reqDeleteUserChannels(target: number) {
      const json = {
        url: `/v1_0/user/channels/${target}`,
        method: 'delete'
      }
      await $http(json)
    },
    async removeUserChannelsSync(id: number) {
      await this.reqDeleteUserChannels(id)
      let currentIndex
      this.userChannels.channels.filter((item: object, index: number) => {
        if (item.id === id) {
          currentIndex = index
          return true
        }
      })
      if (currentIndex !== undefined) {
        this.userChannels.channels.splice(currentIndex, 1)
      }
    },
    async addUserChannels(id: number) {
      const json = {
        url: '/v1_0/user/channels',
        method: 'PATCH',
        data: {
          channels: this.allChannels.filter(item => item.id === id)
        }
      }
      await $http(json)
      const currentChannels = this.allChannels.filter(item => item.id === id)
      this.userChannels.channels.push(...currentChannels)
    }
  },
  getters: {
    getUserChannels(state) {
      return state.userChannels || []
    },
    getActivePage(state) {
      return state.activePage || 0
    },
    getAllChannelsData(state) {
      return state.allChannels || {}
    },
    filterUserChannels(state) {
      return state.allChannels.filter(item => {
        return !state.userChannels.channels.some(userItem => {
          return item.id === userItem.id
        })
      })
    }
  }
})