<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button @click.native="checkClick" class="check-button" :isChecked="isSelectAll"/>
      <span>全选</span>
    </div>
    <div class="total">
      合计:<span>{{totalPrice}}</span>
    </div>
    <div class="calculate" @click="calcClick">
        <button>去结算({{checkLength}})</button>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import {mapGetters} from "vuex";
  export default {
    name: "CartBottomBar",
    components: {CheckButton},
    computed: {
      ...mapGetters({
        cartList: 'cartList'
      }),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.cartList.length === 0 ) return false;
        return !this.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        }else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
          if(!this.isSelectAll) {
              this.$toast.show('请选择购买的商品',2000)
          }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 38px;
    background-color: white;
    display: flex;
    align-items: center;
    border-top: 1px solid #cccccc;
    padding: 0px 10px;

  }
  .check-content {
    display: flex;
    flex: 1;
    /*width: 20px;*/
    height: 18px;

  }
  .check-button {
    border: 1px solid #aaaaaa;
    margin-right: 10px;
  }

  /*.total {
    flex: 1;
  }*/
  .total span{
    color: var(--color-tint);
    margin-right: 8px;
  }
  .calculate button{
    border-radius: 24px;
    padding: 6px 18px;
    background-color: var(--color-tint);
    border: 1px solid var(--color-tint);
    line-height: 1;
    color: white;
  }
</style>