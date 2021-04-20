<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <scroll class="content" 
          ref="scroll"
          :probeType="3"
          :pull-up-load="true"
          @scroll="contentScroll"
          @pullingUp="loadMore">
          <home-swiper :banners="banners"></home-swiper>
          <recommend-view :recommends="recommends" />
          <feature-view />
          <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"/>
          <goods-list :goods="showGoods"/>
        </scroll>
        <back-top @click.native="backClick" :isShowBackTop="isShowBackTop"/>
    </div>
</template>

<script>
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
      }
    },
    created () {
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    computed: {
      showGoods() {
        return this.goods[this.currentGoodsType].list
      }
    },
    methods: {
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
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 504
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
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
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