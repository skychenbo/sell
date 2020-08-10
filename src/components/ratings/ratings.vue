<template>
  <div class="ratings-wrapper">
    <div class="ratings-score">
      <span class="score-left">
        <div class="score">{{ seller.score }}</div>
        <div class="total-title">综合评分</div>
        <div class="rankRate">高于周边商家{{ seller.rankRate }}%</div>
      </span>
      <span class="score-right">
        <div class="food-score">
          <span class="title">食品评价</span>
          <span class="s-score">{{ seller.foodScore }}</span>
        </div>
        <div class="service-score">
          <span class="title">服务态度</span>
          <span class="s-score">{{ seller.serviceScore }}</span>
        </div>
        <div class="delivery-time">
          <span class="title">送达时间</span>
          <span class="d-time">{{ seller.deliveryTime }}</span>
        </div>
      </span>
    </div>
    <split></split>
    <rating-select :comments="ratings" class="ratings-select" @change="change" @showText="showText"></rating-select>
    <ul class="ratings-list">
      <li class="ratings-item" v-for="rating in comments" :key="rating.id">
        <div class="avatar">
          <img class="avatar" :src="rating.avatar">
        </div>
        <div class="ratings-right">
          <div class="time-user">
            <i class="username">{{ rating.username }}</i>
            <span class="time">{{ rating.rateTime }}</span>
          </div>
          <div class="deliveryTime">
            <i class="time" v-show="rating.score">{{ rating.score }}分</i>
            <i class="time" v-show="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</i>
          </div>
          <div class="text">
            <span class="rating-text" v-show="rating.text">{{ rating.text }}</span>
          </div>
          <div class="rate">
            <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down':rating.rateType===1}" class="rate-type"></span>
            <span class="recommend" v-for="rate in rating.recommend" :key="rate.id"><span>{{ rate }}</span></span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Data from '../../../data.json'
import Split from '../split/split'
import RatingSelect from '../rating-select/rating-select'

export default {
  name: 'ratings',
  data () {
    return {
      ratings: [],
      seller: {},
      comments: []
    }
  },
  created () {
    this.info = Data
    this.ratings = this.info.ratings
    this.seller = this.info.seller
    this.comments = this.info.ratings
  },
  methods: {
    change (type) {
      if (type === 2) {
        this.comments = this.ratings
      } else if (type === 0) {
        this.comments = this.ratings.filter(val => val.rateType === 0)
      } else if (type === 1) {
        this.comments = this.ratings.filter(val => val.rateType === 1)
      }
    },
    showText (val) {
      if (val) {
        this.comments = this.ratings.filter(val => val.text !== '')
      } else {
        this.comments = this.ratings
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
.ratings-wrapper
  .ratings-score
    padding: 18px 24px
    .score-left
      padding-right: 24px
      display: inline-block
      text-align: center
      .score
        margin-bottom: 6px
        font-size: 20px
        color: rgb(255,153,0)
        line-height: 28px
      .total-title
        margin-bottom: 8px
        font-size: 12px
        color: rgb(7,17,27)
        line-height: 12px
      .rankRate
        margin-bottom: 6px
        font-size: 10px
        color: rgb(147,153,159)
        line-height: 10px
    .score-right
      padding:3px 0 0 24px
      display: inline-block
      border-left: 1px solid rgba(7,17,27,0.1)
      .title
        display: inline-block
        margin: 0 6px 8px 0
        font-size: 12px
        color: rgb(7,17,27)
        line-height: 18px
      .s-score
        font-size: 12px
        color: rgb(255,153,0)
        line-height: 18px
      .d-time
        font-size: 12px
        color: rgb(147,153,159)
        line-height: 18px
  .ratings-select
    padding-top: 18px
  .ratings-list
    .ratings-item
      display: flex
      flex-direction: row
      padding: 16px 18px
      border-bottom: 1px solid rgba(7,17,27,0.1)
      .avatar
        flex: 0 0 28px
        width: 28px
        height: 28px
        border-radius: 50%
      .ratings-right
        flex: 1
        margin-left: 12px
        .time-user
          font-size: 10px
          font-weight: 400
          color: rgb(147,153,159)
          line-height: 12px
          overflow hidden
          .time
            float: right
          .username
            float: left
            margin-right: 6px
            vertical-align: middle
        .deliveryTime
          .time
            margin-right: 6px
            font-size: 10px
            font-weight: 400
            color: rgb(147,153,159)
            line-height: 12px
        .text
          padding: 6px 0 12px
          font-size: 12px
          line-height: 24px
          .icon-thumb_up
            color: rgb(0,160,220)
          .rating-text
            line-height: 12px
            color: rgb(7,17,27)
        .rate
          .rate-type
            font-size: 12px
            font-weight: 400
          .icon-thumb_up
            color: rgb(0,160,220)
          .recommend
            display: inline-block
            margin: 2px 6px
            font-size: 9px
            font-weight: 400
            color: rgb(147,153,159)
            line-height: 16px
            border: 1px solid rgba(7,17,27,0.1)
            border-radius: 2px
</style>
