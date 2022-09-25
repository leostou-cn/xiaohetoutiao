<template>
  <div class="scroll">
    <div class="scroll_left">
      <div class="left_item" v-scroll="scrollId" v-for="(item ,index ) in listData" :data-scroll-class="item.id"
        :scroll="item.id" :key="item.id">
        <div>
          <slot :scoped="{item,index}" name="left_left_icon"></slot>
          <slot name="left_title" :scoped="item" :index="index">{{item.title}}</slot>
          <slot name="left_right_icon"></slot>
        </div>
      </div>
    </div>
    <div class="scroll_right">
      <div class="detail" :id="scrollId" v-for="(item,index) in listData" :data-scroll-class="item.id" :key="item.id">
        <div class="title">{{item.title}}</div>
        <div class="box">
          <slot name="right_detail" :scoped="item" :index="index"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import type { ScrollType } from './type'
const props = defineProps({
  listData: {
    type: Array<ScrollType>,
    default: () => []
  },
  scrollId: {
    type: String,
    default: () => 'scroll'
  }
})
</script>
<style scoped lang='less'>
.scroll {
  display: flex;
  width: 100%;

  .scroll_left {
    position: fixed;
    overflow: scroll;
    top: 0;
    left: 0;
    bottom: 0;
    margin-top: 46px;
    width: 30%;
    display: flex;
    align-items: center;
    flex-direction: column;

    &::-webkit-scrollbar {
      width: 0 !important
    }

    .left_item {
      color: red;
      width: 110%;
      padding: 20px 0;
      font-size: 14px;
    }
  }

  .scroll_right {
    position: fixed;
    width: 70%;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto;
    margin-top: 46px;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 70px;

    &::-webkit-scrollbar {
      width: 0 !important
    }

    .detail {
      .title {
        color: red
      }
    }
  }
}
</style>