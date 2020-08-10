<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="foods.count" @click.stop='decrease'></div>
    <div class="cart-count" v-show="foods.count > 0">{{ foods.count }}</div>
    <div class="cart-add icon-add_circle" @click.stop='add'></div>
    <!-- <span>{{ JSON.stringify(goods)}}</span> -->
  </div>
</template>

<script>
const EVEN_ADD = 'add'

export default {
  name: 'cart-control',
  props: {
    food: {}
  },
  data () {
    return {
      type: '',
      foods: []
    }
  },
  methods: {
    add () {
      if (event) {
        if (!this.foods.count) {
          this.$set(this.foods, 'count', 1)
        } else {
          this.foods.count++
        }
        this.$emit(EVEN_ADD, this.food, this.foods.count)
      }
    },
    decrease () {
      if (this.foods.count) {
        this.foods.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.cartcontrol
  padding: 10px
  display: flex
  flex-direction: row
  justfity-content: center
  .cart-decrease, .cart-add
    display: inline-block
    // padding: 6px
    font-size: 24px
    line-height: 24px
    color: rgb(0,160,220)
  .cart-count
    display: inline-block
    width: 18px
    font-size: 10px
    color: rgb(147,153,159)
    line-height: 24px
    text-align: center
    // .cart-add
    //   display: inline-block
</style>
