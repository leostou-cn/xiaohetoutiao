<template>
  <van-nav-bar fixed>
    <template #left>
      <div class="left_box" @click.stop="toBack" v-if="showLeftIcon">
        <van-icon name="arrow-left" size=".6667rem" color="#fff" />
        <span v-if="showLeftText" class="left_text">
          {{ showLeftText }}
        </span>
      </div>
    </template>
    <template #title>
      <div v-if="title">{{ title }}</div>
      <slot name='middleBar' />
    </template>>
    <template #right>
      <div @click="clickRightText">
        <van-icon v-if="showRightIcon" name="search" size=".6667rem" color="#fff" />
        <span v-if="showRightText" class="right_text">
          {{ showRightText }}
        </span>
      </div>
    </template>
  </van-nav-bar>
</template>
<script lang='ts' setup>
// props
defineProps({
  title: {
    default: () => ''
  },
  showRightIcon: {
    default: () => false
  },
  showLeftIcon: {
    default: () => false
  },
  showLeftText: {
    type: String,
    default: () => {
      return ''
    }
  },
  showRightText: {
    type: String,
    default: () => {
      return ''
    }
  }
})

//const 
const emits = defineEmits(['onClickBack', 'clickRight'])

// methods
const toBack = () => {
  emits('onClickBack')
}
const clickRightText = () => {
  emits('clickRight')
}
</script>
<style scoped lang='less'>
.van-nav-bar {
  background-color: #0077ff;

  /deep/.van-nav-bar__content {
    .van-nav-bar__title {
      font-size: .5rem;
      color: #fff;
    }

    .left_box {
      .left_text {
        color: #fff;
        font-size: .48rem;
      }
    }

    .right_text {
      color: #fff;
      font-size: 16px;
    }

  }
}
</style>