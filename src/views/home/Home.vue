<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control class="tab-control" :titles="['流行', '新款', '精选']" 
            @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"/>
        <scroll class="content" 
          ref="scroll"
          :probeType="3"
          :pull-up-load="true"
          @scroll="contentScroll"
          @pullingUp="loadMore">
          <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
          <recommend-view :recommends="recommends" />
          <feature-view />
          <tab-control :titles="['流行', '新款', '精选']" 
            @tabClick="tabClick" ref="tabControl2"/>
          <goods-list :goods="showGoods"/>
        </scroll>
        <!-- <div>呵呵呵呵</div> -->
        <back-top @click.native="backClick" :isShowBackTop="isShowBackTop"/>
    </div>
</template>

<script>
import {debounce} from 'common/utils'
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import BackTop from 'components/content/backTop/BackTop'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata,getHomeGoods} from 'network/home'


export default {
    name: 'home',
    components: {
        NavBar,
        Scroll,
        TabControl,
        BackTop,
        GoodsList,
        HomeSwiper,
        RecommendView,
        FeatureView,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        isShowBackTop: false,
        goods: {
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []}
        },
        currentGoodsType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        scrollY: 0,
      }
    },
    created () {
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 1000)
      this.$bus.$on('itemImageLoad', () => {
        // this.$refs.scroll.refresh()
        refresh()
      })
    },
    computed: {
      showGoods() {
        return this.goods[this.currentGoodsType].list
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.scrollY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.scrollY = this.$refs.scroll.getScrollY()
    },
    methods: {
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log('tab-offset-top:', this.tabOffsetTop)
      },

      tabClick(index) {
        switch(index) {
          case 0:
            this.currentGoodsType = 'pop'
            break
          case 1:
            this.currentGoodsType = 'new'
            break
          case 2:
            this.currentGoodsType = 'sell'
            break
          default:
            console.log('invalid goods type:', index)
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        // 判断backTop是否显示
        // console.log(position)
        this.isShowBackTop = (-position.y) > 800

        // 判断tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        console.log('load more')
        this.getHomeGoods(this.currentGoodsType)
      },
      
      // 处理网络请求
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.pop)
          this.goods[type].page++

          this.$refs.scroll.finishPullUp()
        })
      }
    }
}
</script>

<style lang="scss" scoped>
  #home {
    // padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    // position: fixed;
    // left: 0;
    // right: 0;
    // top: 0;
    position: relative;
    z-index: 9;
  }

  .tab-control {
    // position: sticky;
    // top: 44px;
    // z-index: 9;
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  // .content {
  //   height: calc(100% - 93px);
  //   overflow: hidden;
  //   margin-top: 44px;
  // }
</style>