<template>
  <div>
    <headerVueVue title="小何头条" @onClickBack="goBack" @clickRight="toSearch" :showLeftIcon="true && !isHome"
      :showRightIcon="true" v-if="showTop" />
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
import { ref, computed, onErrorCaptured } from 'vue'
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
  return ['home', 'user', 'scroll', 'video'].some(item => {
    return item === route.name
  })
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
const goBack = () => {
  router.go(-1)
}

onErrorCaptured((e) => {
  console.log(e);
  console.log(1);
})

</script>
<style scoped lang='less'>
.container {
  padding-bottom: 50px;
}

.layout-leave-active {
  transition: all 0.5s ease-in-out;
}

.layout-enter-active {
  transition: all 0.5s ease-in-out;
}

.layout-enter-from {
  transform: translateX(100%);
}

.layout-enter-to {
  transform: translateX(0);
}

.layout-leave-from {
  transform: translateX(0);
}

.layout-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>