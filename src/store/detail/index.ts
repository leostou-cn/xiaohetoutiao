import { defineStore } from 'pinia'
import $http from '@axios'
import { router } from "@/router"
import type { CommentType, SendCommentType, LikeCommentType } from './type'
export default defineStore('detailStore', {
  state: () => {
    return {
      articleDetail: {
        results: []
      },
      commentData: {
        results: [],
        last_id: '',
        end_id: ''
      }
    }
  },
  actions: {
    async reqGetArticleDetail(id: string) {
      let art_id
      if (id) {
        art_id = id
        window.localStorage.setItem('art_id', JSON.stringify(id))
      } else {
        art_id = window.localStorage.getItem('art_id') as string
      }
      const json = {
        url: `/v1_0/articles/${art_id}`,
      }
      const result = await $http(json)
      if (result.message === 'OK') {
        this.articleDetail = result.data
        await this.reqGetCommentData({
          type: 'a',
          source: art_id
        })
        router.push(`/detail/${id}`)
      }
    },
    async reqChangeFollow(id: string, type: boolean) {
      let json
      if (type) {
        // 取消关注
        json = {
          url: `/v1_0/user/followings/${id}`,
          method: 'DELETE',
        }
      } else {
        json = {
          url: '/v1_0/user/followings',
          method: 'POST',
          data: {
            target: id
          }
        }
      }
      try {
        await $http(json)
        this.articleDetail.is_followed = !this.articleDetail.is_followed
        return true
      } catch (error) {
        return false
      }
    },
    async reqChangeAttitude(id: string, type: number) {
      let json
      if (type === 1) {
        json = {
          url: `/v1_0/article/likings/${type}`,
          method: 'delete',
          data: {
            target: id
          }
        }
      } else {
        json = {
          url: '/v1_0/article/likings',
          method: 'post',
          data: {
            target: id
          }
        }
      }
      await $http(json)
      if (type === 1) {
        this.articleDetail.attitude = 0
      } else {
        this.articleDetail.attitude = 1
      }
    },
    async reqGetCommentData({ type, source, offset, limit = 10 }: CommentType) {
      if (this.getFinished) return
      const json = {
        url: '/v1_0/comments',
        params: {
          type,
          source,
          offset: this.commentData.last_id || undefined,
          limit
        }
      }
      const result = await $http(json)
      if (result.message === 'OK') {
        if (this.commentData.results.length === 0) {
          this.commentData = result.data
        } else {
          this.commentData.results.push(...result.data.results)
          this.commentData.total = result.data.total
        }
        this.commentData.end_id = result.data.end_id
        this.commentData.last_id = result.data.last_id
      }
    },
    async reqChangeCollected(id: string, type: boolean) {
      let json
      if (type) {
        json = {
          url: `/v1_0/article/collections/${id}`,
          method: 'delete'
        }
      } else {
        json = {
          url: '/v1_0/article/collections',
          method: 'post',
          data: {
            target: id
          }
        }
      }
      try {
        await $http(json)
        this.articleDetail.is_collected = !this.articleDetail.is_collected
      } catch (error) {
        console.log(error);
      }
    },
    async reqSendComment({ target, content, art_id }: SendCommentType) {
      const json = {
        url: '/v1_0/comments',
        method: 'post',
        data: {
          target,
          content,
          art_id
        }
      }
      const result = await $http(json)
      if (result.message === 'OK') {
        this.commentData.results.unshift(result.data.new_obj)
        this.commentData.end_id = result.data.end_id
        this.commentData.last_id = result.data.last_id
        this.commentData.total_count++
        this.articleDetail.comm_count++
      }
    },
    async reqLikeComment({ target, type }: LikeCommentType) {
      const json = {
        url: type ? `/v1_0/comment/likings/${target}` : '/v1_0/comment/likings',
        method: type ? 'delete' : 'post',
        data: type ? undefined : { target }
      }
      try {
        await $http(json)
        return true
      } catch (error) {
        return false
      }
    }
  },
  getters: {
    getArticleDetail(state) {
      return state.articleDetail || {} as ArticleDetailType
    },
    getCommentData(state) {
      return state.commentData.results
    },
    getFinished(state) {
      return state.commentData.results.length === state.commentData.total_count
    }
  }
})