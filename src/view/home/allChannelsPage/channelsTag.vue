<template>
  <div class="channels_tag" @click.stop="clickBox">
    <slot />
    <div class="close_tag" v-if="showTag" @click.stop="closeTag">x</div>
  </div>
</template>
<script lang='ts' setup>
  // const
const emits = defineEmits(['close-tag','onClick'])
defineProps({
  showTag: {
    type: Boolean,
    default: () => {
      return true
    }
  }
})

// methods
const clickBox = () => {
  emits('onClick')
}
const closeTag = () => {
  emits('close-tag')
}
</script>
<style scoped lang='less'>
.channels_tag {
  display: inline-block;
  position: relative;
  padding: 5px 15px;
  margin: 5px 10px;
  height: 32px;
  max-width: 60px;
  font-size: 12px;
  color: #000;
  text-align: center;
  line-height: 32px;
  background-color: #fafafa;

  .close_tag {
    position: absolute;
    z-index: 999;
    height: 20px;
    width: 20px;
    text-align: center;
    line-height: 20px;
    top: 0;
    right: 0;
    color: #ccc;
  }
}
</style>