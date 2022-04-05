<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsinfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"
import Scroll from "components/common/scroll/Scroll";
import GoodsList from 'components/content/goods/GoodsList.vue'
import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail";
import {debounce} from "common/utils";
import {itemListenerMixin, backTopMixin} from "common/mixin";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],/*存组件距离顶部的Y值*/
      getThemeTopYs: null, /*给this.themeTopY赋值的操作*/
    };
  },
   methods:{
      imageLoad(){
          this.$refs.scroll.refresh()
          this.getThemeTopYs()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000)
      },
      contentScroll(position) {
        //滚动超过1000显示回到顶部按钮
        this.isShowBackTop = position.y < -1000;
        //1.获取y值
        const y = -position.y;
        const length = this.themeTopYs.length;
        //2.position和主题中的值进行对比
        for(var i = length-1; i>-1; i--) {
          if(y >= this.themeTopYs[i]) {
            this.$refs.nav.currentIndex = i;
            break;
          }
        }
        /*this.themeTopYs.forEach((v,index) => {
          console.log("值："+v+",下标："+index);
        })*/
      },
  },
  created() {
    // 1.保存传入的
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 1.获取顶部的轮播数据
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建店铺信息
      this.shop = new Shop(data.shopInfo);
    //   4.保存商品的详细数据
    this.detailInfo = data.detailInfo;
    // 5.获取参数信息
    this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
    // 6.获取评论的信息
    if(data.rate.cRate !== 0){
      this.commentInfo = data.rate.list[0]
    }
    });
     //请求推荐数据数
      getRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.list
      });
        //给 赋值(对给this.themeTopY赋值的操作进行防抖)
      this.getThemeTopYs = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
        // console.log(this.themeTopYs)
      }, 200);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content{
    height: calc(100% - 44px);
}
.detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
}
</style>
