<template>
  <div class="back-top" v-if="isShowBackTop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  props: {
    isShowBackTop: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .back-top {
    position: fixed;
    right: 8px;
    bottom: 55px;

    img {
      width: 40px;
    }
  }
</style>