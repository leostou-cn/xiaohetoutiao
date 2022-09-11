<template>
  <div>
    <headerVueVue title="小何头条" @clickRight="toSearch" :showLeftIcon="true && !isHome" :showRightIcon="true"
      v-if="isHome" />
    <div class="container" id="LayoutContainer">
      <router-view></router-view>
    </div>
    <tabBarVue @getBar="getBar" />
  </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue'
import tabBarVue from '../../components/tabBar.vue';
import headerVueVue from '../../components/headerVue.vue';
import { useRouter } from 'vue-router';
// const
const isHome = ref(true)
const router = useRouter()

// methods
const getBar = (data: string) => {
  isHome.value = data === 'home' ? true : false
}
const toSearch = () => {
  router.push({ name: 'search' })
}
</script>
<style scoped lang='less'>
.container {
  padding-bottom: 50px;
}
</style>