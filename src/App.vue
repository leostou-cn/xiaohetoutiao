<script setup lang="ts">
</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive :exclude="['detailView']">
          <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style >
html,
body {
  height: 100%;
  width: 100%;
  scrollbar-width: none
}
</style>

<style lang="less" scoped>
// .layout-enter-active{
// }
.layout-leave-active {
  transition: all 0.3s linear;
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
</style>
