import { defineStore } from "pinia";
import { localSearch } from "../../utils/localSearch";
import $http from '@axios'

export default defineStore('searchStore', {
  state: () => {
    return {
      sugSearchData: [],
      highLightValue: '',
      showType: 'history',
      searchResult: {
        results: [] as Array<[]>,
        finished: false,
        page: 1
      }
    }
  },
  actions: {
    async reqGetSugSearchData(data: string) {
      const json = {
        url: '/v1_0/suggestion',
        method: 'get',
        params: {
          q: data
        }
      }
      const result = await $http(json)
      this.sugSearchData = result.data.options
      if (result.message === 'OK') {
        this.highLightValue = data
        this.changeShowType('sugSearch')
      }
    },
    async reqGetSearchData(data: string) {
      const json = {
        url: '/v1_0/search',
        method: 'get',
        params: {
          q: data,
          per_page: 35,
          page: this.searchResult.page
        }
      }
      const result = await $http(json)
      if (result.message === 'OK') {
        this.changeShowType('result')
        this.searchResult.page++
        if (this.searchResult.results.length === 0) {
          this.searchResult.results = result.data.results
          localSearch({
            type: 'set',
            value: data
          })
        } else {
          this.searchResult.results.push(...result.data.results)
        }
        if (result.data.total_count === this.searchResult.results.length) {
          this.searchResult.finished = true
        }
      }
    },
    clearSugSearchData() {
      this.sugSearchData = []
    },
    changeShowType(data: string) {
      this.showType = data
    },
    clearResultData() {
      this.searchResult.finished = false
      this.searchResult.page = 1
      this.searchResult.results = []
    }
  },
  getters: {
    getSugSearchData(state) {
      return state.sugSearchData
    },
    getHighLightValue(state) {
      return state.highLightValue
    },
    getShowType(state) {
      return state.showType
    },
    getSearchResult(state) {
      return state.searchResult.results
    },
    getFinished(state) {
      return state.searchResult.finished || false
    }
  }
})