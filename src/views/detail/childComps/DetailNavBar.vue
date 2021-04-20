<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <span class="title-item" v-for="(title, index) in titles"
            :key="title" :class="{active: currentIndex === index}" @click="titleClick(index)">
          {{title}}
        </span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    display: flex;
    text-align: center;
    font-size: 13px;

    .title-item {
      flex: 1;
    }
  }

  .active {
    color: var(--color-high-text)
  }

  .back img {
    margin-top: 11px;
  }
</style>