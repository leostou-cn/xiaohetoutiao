import { defineStore } from "pinia";
import $http from '@axios'
import type { GetFollowType } from './type'
export default defineStore('userStore', {
  state() {
    return {
      userProfile: {

      },
      userFollower: {

      },
      userFollowings: {

      },
      userInfo: {

      }
    }
  },
  actions: {
    async reqGetUserProfile() {
      const json = {
        url: '/v1_0/user/profile'
      }
      const result = await $http(json)
      this.userProfile = result.data
    },
    async reqGetUserFollower({ page, per_page }: GetFollowType) {
      const json = {
        url: '/v1_0/user/followers',
        page,
        per_page
      }
      const result = await $http(json)
      this.userFollower = result.data
    },
    async reqGetUserFollowings({ page, per_page }: GetFollowType) {
      const json = {
        url: '/v1_0/user/followings',
        page,
        per_page
      }
      const result = await $http(json)
      this.userFollowings = result.data
    },
    async reqGetUserInfo() {
      const json = {
        url: '/v1_0/user'
      }
      const result = await $http(json)
      this.userInfo = result.data
    },
    async reqUpdatePhoto(file: File) {
      const json = {
        url: '/v1_0/user/photo',
        method: 'PATCH',
        data: {
          photo: file
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const result = await $http(json)
      this.userProfile.photo = result.data.photo
      this.userInfo.photo = result.data.photo
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    },
    // getUserData(state) {
    //   return {
    //     follower: state.userFollower.total_count,
    //     followings: state.userFollowings.total_count,
    //   }
    // }
  }
})