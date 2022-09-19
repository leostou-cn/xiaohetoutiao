<template>
  <div>
    <headerVueVue title="小何头条" @clickRight="toSearch" :showLeftIcon="true && !isHome" :showRightIcon="true"
      v-if="showTop" />
    <div class="container" id="LayoutContainer">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <tabBarVue @getBar="getBar" v-show="showTabBar" />
  </div>
</template>
<script lang='ts' setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router';
import tabBarVue from '../../components/tabBar.vue';
import headerVueVue from '../../components/headerVue.vue';
import { useRouter } from 'vue-router';
// const
const isHome = ref(true)
const route = useRoute()
const router = useRouter()

// computed
const showTabBar = computed(() => {
  return route.name === 'home' || route.name === 'user'
})
const showTop = computed(() => {
  return route.name !== 'user'
})

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