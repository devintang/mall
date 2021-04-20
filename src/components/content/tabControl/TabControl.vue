<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="item" 
      class="tab-control-item"
      :class="{active: index == currentIndex}"
      @click="btnClick(index)"
      >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    btnClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-control {
  display: flex;
  text-align: center;
  line-height: 40px;
  background-color: white;
  font-size: 15px;

  .tab-control-item {
    flex: 1;

    span {
      padding: 5px;
    }
  }

  .active {
    color: var(--color-high-text);

    span {
      border-bottom: 3px solid var(--color-tint);
    }
  }
}
</style>