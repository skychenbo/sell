<template>
  <div class="goods">
    <div class="scroll">
      <div class="srcoll-nav-wrapper" ref="meunScroll">
        <ul class="nav-left">
          <li class="nav-left-list"
            v-for="(item, index) in goods"
            :key="index"
            :class="{'active': currentIndex === index}"
            @click="selectLeft(index)"
            ref="rItem">
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="nav-right" ref="foodsScroll">
        <div>
          <div v-for="(item, index) in goods" :key="index" ref="goodsRef">
            <div class="title">{{ item.name }}</div>
            <div class="goods-list" @click="enterfood(item.name, food.name)"  v-for="food in item.foods" :key="food.id">
              <div class="goods-pic" >
                <img :src="food.image" class="goods-image">
              </div>
              <div class="goods-content">
                <div class="name">{{ food.name }}</div>
                <div class="description">{{ food.description }}</div>
                <div class="count">
                  <span class="sellcount">月售{{ food.sellCount}}份</span>
                  <span class="rating">好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="newprice">￥{{ food.price }}</span>
                  <span class="oldprice" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food" @add="onAdd"></cart-control>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shopping-cart">
      <div class="bgc"></div>
      <div class="cart" @click="showCart" :visible="visible">
        <div class="icon-shopping_cart icon"></div>
      </div>
      <span class="total-price">￥0</span>
      <span class="deliveryPrice">另需配送费￥4元</span>
      <span class="minPrice">￥20起送</span>
    </div>
    <shopping-cart :class="{'display': visible}" class="cart-shopping" :cartFood="cartFood" :foodCout="foodCout"></shopping-cart>
  </div>
</template>

<script>
import { getGoods } from '../../../api'
import CartControl from '../cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
import ShoppingCart from '../shopping-cart/shopping-cart'
export default {
  name: 'goods',
  data () {
    return {
      goods: {
        foods: []
      },
      scrollY: 0,
      heightList: [],
      active: false,
      shoppingCartFood: [],
      shoppingCartFoodCount: [],
      visible: true,
      cartFood: {},
      foodCout: 0
    }
  },
  mounted () {
    this._getGoods()
  },
  computed: {
    // 根据右菜单滑动的距离以及每一个 li 的高度的比较返回当前应该显示左菜单 li的索引，让该 li 高亮显示，即:class="{active: currentIndex === index}"
    currentIndex () {
      const scrollPosition = this.scrollY
      const index = this.heightList.findIndex((item, index) => {
        return scrollPosition >= this.heightList[index] && scrollPosition < this.heightList[index + 1]
      })
      // console.log(index);
      return index
    }
  },
  methods: {
    enterfood (itemName, name) {
      this.$router.push({
        path: '/food',
        query: { itemName, name: name }
      })
    },
    _getGoods () {
      getGoods({
        id: this.goods.id
      }).then((goods) => {
        this.goods = goods
        this.$nextTick(() => {
          this._initScroll()
          this._getHeight()
        })
      })
    },
    _initScroll () {
      this.meunScroll = new BScroll(this.$refs.meunScroll, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsScroll, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        // 获取实时滚动的距离 使用scrollY接收
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _getHeight () {
      // 获取元素
      const foodList = this.$refs.goodsRef
      // listHeight的第一个元素为0
      let height = 0
      // 之后的高度即为当前li的高度加上之前面li的高度和
      this.heightList.push(height)
      // for (let i = 0; i < foodList.length; i++) {
      //   const item = foodList[i]
      //   height += item.clientHeight
      //   this.listHeight.push(height)
      // }
      foodList.forEach(item => {
        // clientHeight
        height += item.offsetHeight
        this.heightList.push(height)
      })
    },
    selectLeft (index) {
      this.active = true
      const height = this.heightList[index]
      this.foodsScroll.scrollTo(0, -height, 200)
    },
    onAdd (food, count) {
      this.cartFood = food
      console.log(this.cartFood)
      this.foodCout = count
      console.log(this.foodCout)
    //   const shoppingCart = this.shoppingCartFood.findIndex(val => val.name === food.name)
    //   if ( )
    //   this.shoppingCartFoodCount = count + 1
    //   console.log(shoppingCart);
    },
    showCart () {
      console.log('111')
      this.visible = !this.visible
    }
  },
  components: {
    CartControl,
    ShoppingCart
  }
}
</script>

<style lang="stylus" scoped>
.goods
  position: relative
  width: 375px
  height: 493px
  .scroll
    position: relative
    display: flex
    .srcoll-nav-wrapper
      flex: 0 0 80px
      background-color: #f3f5f7
      overflow: hidden
      height: 443px
      .nav-left
        .nav-left-list
          padding: 0 12px
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          height: 54px
          font-size: 12px
          color: rgb(77,85,93)
          font-weight: normal
          text-align: center
          // line-height: 54px
          border-bottom: 1px solid rgba(7,17,27,0.1)
          &.active
            position: relative
            margin-top: -1px
            // z-index: 10
            font-weight: 700
            background-color: #fff
            border-bottom: none
    .nav-right
      flex: 1
      height: 443px
      overflow: hidden
      .title
        padding-left: 14px
        height: 26px
        font-size 12px
        color: rgb(147,153,159)
        line-height: 26px
        background-color: #f3f5f7
        border-left: 2px solid #d9dde1
      .goods-list
        overflow: hidden
        margin: 0 18px
        padding: 19px 0
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .goods-pic
          position: relative
          float: left
          margin: 0 auto
          width: 70px
          height: 70px
          overflow: hidden
          background-color: rgb(245,255,2)
          .goods-image
            position: absolute
            top: 0
            left: -13px
            text-align: center
            height: 70px
        .goods-content
          position: relative
          float: left
          margin-left: 10px
          .name
            padding: 2px 0 8px
            font-size: 14px
            color: rgb(7,17,27)
            line-height: 14px
          .description
            width: 165px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            padding-bottom: 8px
            font-size: 10px
            color: rgb(147,153,159)
            line-height: 10px
          .count
            font-size: 10px
            color: rgb(147,153,159)
            line-height: 10px
            .sellcount
              margin-right: 10px
          .price
            margin-top: 10px
            .newprice
              margin-right: 8px
              font-size: 14px
              color: rgb(240,20,20)
              font-weight: 700
              line-height: 14px
            .oldprice
              font-size: 10px
              color: rgb(147,153,159)
              font-weight: 400
              line-height: 10px
              text-decoration: line-through
          .cartcontrol-wrapper
            position: absolute
            right: -25px
            bottom: -15px
  .shopping-cart
    position: absolute
    left: 0
    bottom: 0
    height: 50px
    line-height: 50px
    width: 100%
    background-color: #141d27
    z-index: 99
    .cart
      position: absolute
      top: -10px
      left: 25px
      z-index: 99
      width: 50px
      height: 50px
      border-radius: 50%
      background-color: rgba(255,255,255,0.2)
      .icon
        font-size: 24px
        line-height: 50px
        color: rgba(255,255,255,0.4)
        text-align: center
    .bgc
      position: absolute
      left: 20px
      bottom: 7px
      width: 60px
      height: 60px
      background-color: #141d27
      border-radius: 50%
    .total-price
      margin: 0 10px 0 85px
      font-size: 14px
      font-weight: 700
      color: rgba(255,255,255,0.4)
    .deliveryPrice
      padding-left: 10px
      font-size: 12px
      color: rgba(255,255,255,0.4)
      font-weight: 400
      border-left: 1px solid rgba(255,255,255,0.4)
    .minPrice
      float: right
      width: 105px
      height: 100%
      background-color: rgba(255,255,255,0.2)
      color: rgba(255,255,255,0.4)
      font-size: 14px
      font-weight: 700
      text-align: center
  .cart-shopping
    position: absolute
    top: -174px
    left: 0
    width: 100%
    height: 667px
    &.display
      display: none
</style>
