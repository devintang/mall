<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.img" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="fav">{{goodsItem.fav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('itemImageLoad')
    },
    itemClick() {
      this.$router.push('/detail/111')
    }
  }
}
</script>

<style lang="scss" scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;

    img {
      width: 100%;
      border-radius: 5px;
    }

    .goods-info {
      font-size: 12px;
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      overflow: hidden;
      text-align: center;

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
      }

      .price {
        color: var(--color-high-text);
        margin-right: 20px;
      }

      .fav {
        position: relative;
      }

      .fav::before {
        position: absolute;
        content: '';
        left: -15px;
        top: 0;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
      }
    }
  }
</style>