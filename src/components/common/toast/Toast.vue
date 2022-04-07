<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      // message: {
      //   type: String,
      //   default() {
      //     return "所有人曾经都是小孩，但是只有少数人记得";
      //   }
      // }
    },
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, duration=1200) {
        this.isShow = true;
        this.message = message;
        setTimeout(() => {
          this.isShow = false;
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    background: rgba(255, 185, 195, .88);
    padding: 8px 10px;
    color: white;
    border-radius: 10px;
  }
</style>