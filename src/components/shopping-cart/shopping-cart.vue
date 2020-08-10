<template>
  <div>
    <div class="shopping-cart-wrapper">
      <div class="cart-list">
        <div class="title">
          <span class="name">购物车</span>
          <span class="clearance" @click="clearance">清空</span>
        </div>
        <div class="cart-item">
          <div class="food-list">
            <span class="food-name">{{cartFood.name}}</span>
            <span class="food-price"><i class="yuan">￥</i>{{cartFood.price}}</span>
            <cart-control class="cart-control"></cart-control>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartControl from '../cartcontrol/cartcontrol'

export default {
  name: 'shopping-cart',
  props: {
    cartFood: {},
    foodCout: Number
  },
  data () {
    return {
      visible: false,
      foodItem: Number,
      foodList: []
    }
  },
  methods: {
    showFoos () {
      console.log(this.foodCout);
      console.log(this.cartFood);
      const foodList = []
      const foodItem = this.cartFood.findIndex(val => val.name === this.cartFood.name)
      if (foodItem > 0) {
        this.foodList = this.cartFood
      } else if (foodItem < 0) {
        foodList.push(this.cartFood)
      }
      console.log(foodItem);
    },
    clearance () {
      this.cartFood = ''
    }
  },
  components: {
    CartControl
  }
}
</script>

<style lang="stylus" scoped>
.shopping-cart-wrapper
  position: relative
  width: 100%
  height: 100%
  background-color: rgba(7,17,37,0.6)
  backdrop-filter: blur(10px)
  opacity: 1
  .cart-list
    position: absolute
    top: 159px
    left: 0
    width: 100%
    background-color: rgb(255,255,255)
    .title
      padding: 0 18px
      height: 40px
      border-bottom: 1px solid rgba(7,17,27,0.1)
      background-color: #f3f5f7
      .name
        font-size: 14px
        font-weight: 400
        color: rgb(7,17,27)
        line-height: 40px
      .clearance
        float: right
        font-size: 12px
        font-weight: 400
        color: rgb(0,160,220)
        line-height: 40px
    .cart-item
      position: relative
      padding: 12px 18px 0
      .food-list
        padding-bottom: 12px
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .food-name
          font-size: 14px
          color: rgb(7,17,27)
          line-height: 24px
        .food-price
          float: right
          margin-right: 70px
          font-size: 14px
          color: rgb(240,20,20)
          line-height: 24px
          font-weight: 700
          .yuan
            font-size: 10px
            font-weight: 400
        .cart-control
          position: absolute
          top: 3px
          right: 5px
</style>
