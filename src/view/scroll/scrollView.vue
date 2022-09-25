<template>
  <div class="container">
    <scrollCompVue :listData='listData'>
      <template #left_left_icon>
        左左
      </template>
      <template #left_title="{scoped}">
        {{scoped.title}}
      </template>
      <template #left_right_icon>
        左右
      </template>
      <template #right_detail="{scoped}">
        <div v-for="(item,index) in scoped.children" :key="index">{{item}}</div>
      </template>
    </scrollCompVue>
  </div>
</template>
<script lang='ts' setup>
import listData from './const.js'
import scrollCompVue from '../../components/scrollComp.vue';
</script>
<style scoped lang='less'>
.container {
  .left {
    flex: 1;
    position: fixed;
    top: 0;
    bottom: 0;
    overflow: auto;
    margin-top: 46px;
    scrollbar-width: none
  }

  .right {
    overflow: scroll;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto;
    margin-top: 46px;
    scrollbar-width: none
  }
}
</style>