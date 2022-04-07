import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";


export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 500)
    // this.itemImgListener = () => {
    //   newRefresh()
    // };
    this.$bus.$on('itemImgLoad', newRefresh)
    console.log("我是混入中的内容")
  }
};

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
  }
};