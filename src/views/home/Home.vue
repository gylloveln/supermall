<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        class="tab-control"
        v-show="isTabFixed"
        ref="tabControl1"
      ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadmore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-vies :recommends="recommends"></recommend-vies>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendVies from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";
import TabControl from "components/content/tabControl/TabControl";
import BackTop from "components/content/backTop/BackTop";
import GoodsList from "components/content/goods/GoodsList";
import { getHomeMultidata, getHomeGoods } from "network/home";
import Scroll from "components/common/scroll/Scroll";
import {itemListenerMixin, backTopMixin} from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendVies,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins:  [itemListenerMixin,backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  activated(){
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },  
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()
    console.log(this.saveY)
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted(){
    //  // 监听item中图片加载完成
    // const refresh = debounce(this.$refs.scroll.refresh,50)
    // this.$bus.$on('itemImageLoad',()=>{
    //   refresh()
    // })
      
  },
  methods: {
    // 事件监听相关的方法  
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 2.决定tabbarControl是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadmore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el,用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop 
    },
    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res)
        // this.result = res
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
/* .content { */
/* height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px; */
/* } */
</style>
