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
  scroll-behavior: smooth;
}
</style>
