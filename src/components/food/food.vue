<template>
  <div class="foods">
    <div>
      <div class="foods-wrapper">
        <div class="foods-content">
          <div class="food-avatar">
            <img :src="foods.image" class="food-avatar">
          </div>
          <div class="text-content">
            <div class="food-name">{{ foods.name }}</div>
            <div class="count">
              <span class="sellcount">月售{{ foods.sellcount }}份</span>
              <span class="rating">好评率{{ foods.rating }}%</span>
            </div>
            <div class="price">
              <span class="newprice">￥<i class="food-price">{{ foods.price }}</i></span>
              <span class="oldprice" v-if="foods.oldPrice">￥{{ foods.oldPrice }}</span>
            </div>
          </div>
        </div>
        <split v-show="foods.info"></split>
        <div class="food-info" v-show="foods.info">
          <p class="title">商品介绍</p>
          <p class="info">{{ foods.info }}</p>
        </div>
        <split></split>
        <div class="food-rating">
          <div class="rating-title">
            <div class="title">商品评价</div>
            <rating-select @change="change" :comments="foods.ratings" @showText="showAllComments"></rating-select>
            <ul class="ratings-list">
              <li class="ratings-item" v-for="rating in comments" :key="rating.id">
                <div class="time-user">
                  <span class="time">{{ rating.rateTime }}</span>
                  <span class="user">
                    <i class="username">{{ rating.username }}</i>
                    <img class="avatar" :src="rating.avatar">
                  </span>
                </div>
                <div class="text">
                  <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down':rating.rateType===1}"></span>
                  <span class="rating-text">{{ rating.text }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoods } from '../../../api'
import Split from '../split/split'
import RatingSelect from '../rating-select/rating-select'
export default {
  name: 'foods',
  data () {
    return {
      type: '',
      foods: {
        ratings: []
      },
      comments: []
    }
  },
  created () {
    this.name = this.$route.query.name
    this.itemName = this.$route.query.itemName
    this._getGoods()
  },
  methods: {
    _getGoods () {
      // 获取goods数据
      getGoods().then((goods) => {
        // 找到goods.name等于this.itemName的值
        const good = goods.find(val => val.name === this.itemName)
        const foods = good.foods.find(val => val.name === this.name)
        this.foods = foods
        this.comments = foods.ratings
      })
    },
    change (type) {
      if (type === 2) {
        // 把评价列表全部渲染出来
        this.comments = this.foods.ratings
      } else if (type === 1) {
        // 渲染rateType为1的列表
        this.comments = this.foods.ratings.filter(val => val.rateType === 1)
      } else if (type === 0) {
        // 渲染rateType为0的列表
        this.comments = this.foods.ratings.filter(val => val.rateType === 0)
      }
    },
    showAllComments (val) {
      if (!val) {
        // 渲染全部评价列表
        this.comments = this.foods.ratings
      } else {
        // 渲染有内容评价列表
        this.comments = this.foods.ratings.filter(val => val.text !== '')
      }
    }
  },
  components: {
    Split,
    RatingSelect
  }
}
</script>

<style lang="stylus" scoped>
.foods
  .foods-wrapper
    .foods-content
      background-color #fff
      .food-avatar
        width: 375px
        height: 375px
      .text-content
        padding: 18px
        .food-name
          font-size: 14px
          font-weight: 700
          color: rgb(7,17,27)
          line-height: 14px
        .count
          margin: 8px 0 18px
          font-size: 10px
          font-weight: 400
          color: rgb(147,153,159)
          line-height: 10px
        .price
          margin-top: 10px
          font-size: 10px
          font-weight: 400
          line-height: 10px
          .newprice
            margin-right: 8px
            color: rgb(240,20,20)
            .food-price
              font-size: 14px
              font-weight: 700
          .oldprice
            color: rgb(147,153,159)
            text-decoration: line-through
    .food-info
      padding: 18px
      background-color #fff
      .title
        margin-bottom: 6px
        font-size: 14px
        font-weight: 400
        color: rgb(7,17,27)
        line-height: 14px
      .info
        padding: 0 8px
        font-size: 12px
        font-weight: 400
        color: rgb(77,65,93)
        line-height: 24px
    .food-rating
      .title
        padding: 18px
      .ratings-list
        .ratings-item
          padding: 16px 18px
          .time-user
            font-size: 10px
            font-weight: 400
            color: rgb(147,153,159)
            line-height: 12px
            overflow: hidden
            .time
              float: left
            .user
              float: right
              .username
                margin-right: 6px
                vertical-align: middle
              .avatar
                width: 12px
                height: 12px
                border-radius: 50%
          .text
            padding: 6px 0 12px
            font-size: 12px
            line-height: 24px
            .icon-thumb_up
              color: rgb(0,160,220)
            .rating-text
              margin-left: 4px
              line-height: 12px
              color: rgb(7,17,27)
</style>
