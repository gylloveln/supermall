<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/images/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default() {
          return false;
        }
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 49%;
    border: 1px solid var(--color-tint);
  }
  .check {
    background-color: red;
    border-color: red;
  }

</style>