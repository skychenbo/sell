<template>
  <div class="seller-wrapper">
    <div class="seller-content">
      <div class="favorite" @click="like" :class="{'color': visible}">
        <div class="icon-favorite"></div>
        <div class="favo">{{ favoriteText }}</div>
      </div>
      <div class="seller-name">
        <div>{{ seller.name}}</div>
        <div class="sell-count">月售{{ seller.sellCount }}单</div>
      </div>
      <div class="seller-time">
        <span class="min-price">
          <div class="name">起送价</div>
          <div>{{seller.minPrice }} <i class="yuan">元</i></div>
        </span>
        <span class="min-price">
          <div class="name">商家配送</div>
          <div>{{seller.deliveryPrice }} <i class="yuan">元</i></div>
        </span>
        <span class="min-price">
          <div class="name">平均配送时间</div>
          <div>{{seller.deliveryTime }} <i class="yuan">分钟</i></div>
        </span>
      </div>
    </div>
    <split></split>
    <div class="seller-bulletin">
      <div class="title">公告与活动</div>
      <div class="bulletin"> {{seller.bulletin }}</div>
      <div class="supports" v-for="support in seller.supports" :key="support.id">{{ support.type + 1 + '、' }}{{ support.description }}</div>
    </div>
    <split></split>
    <div class="seller-pic">
      <div class="title">商家实景</div>
      <div class="pics">
        <img :src="pic"  v-for="pic in seller.pics" :key="pic" :style="{'width': 120+'px', 'height': 90+'px'}" class="pic">
      </div>
    </div>
    <split></split>
    <div class="seller-info">
      <div class="title">商家信息</div>
      <div class="infos" v-for="info in seller.infos" :key="info">{{ info }}</div>
    </div>
  </div>
</template>

<script>
import { getSeller } from '../../../api'
import Split from '../split/split'
export default {
  name: 'seller',
  data () {
    return {
      seller: {},
      visible: false
    }
  },
  created () {
    this._getSller()
  },
  computed: {
    favoriteText () {
      return this.visible ? '已收藏' : '收藏'
    }
  },
  methods: {
    _getSller () {
      getSeller().then((seller) => {
        this.seller = seller
        console.log(this.seller)
      })
    },
    like () {
      this.visible = !this.visible
    }
  },
  components: {
    Split
  }
}
</script>

<style lang="stylus" scoped>
.seller-wrapper
  .seller-content
    position: relative
    padding: 18px 18px
    .favorite
      position: absolute
      top: 20px
      right: 18px
      font-size: 24px
      color: rgb(77,85,93)
      line-height: 24px
      text-align: center
      &.color
        color: rgb(240,20,20)
      .favo
        margin-top: 4px
        font-size: 10px
        color: rgb(77,85,93)
        line-height: 10px
    .seller-name
      font-size: 14px
      color: rgb(7,17,27)
      line-height: 14px
      border-bottom: 1px solid rgba(7,17,27,0.1)
      .sell-count
        padding: 12px 0
        font-size: 10px
        color: rgb(77,85,93)
        line-height: 18px
    .seller-time
      display: flex
      text-align: center
      .min-price
        padding: 18px 0
        flex: 1
        font-size: 24px
        color: rgb(7,17,27)
        line-height: 24px
        border-right: 1px solid rgba(7,17,27,0.1)
        .name
          margin-bottom: 4px
          font-size: 10px
          color: rgb(147,159,153)
          line-height: 10px
        .yuan
          font-size: 10px
      .min-price:last-child
        border-right: none
  .seller-bulletin
    padding: 18px 18px 0
    .title
      margin-bottom: 8px
      font-size: 14px
      color: rgb(7,17,27)
      line-height: 14px
    .bulletin
      margin-left: 12px
      padding: 0 0 16px
      font-size: 12px
      color: rgb(240,20,20)
      line-height: 24px
      border-bottom: 1px solid rgba(7,17,27,0.1)
    .supports
      padding: 16px 0 16px 12px
      font-size: 12px
      color: rgb(7,17,27)
      line-height: 16pxpx
      border-bottom: 1px solid rgba(7,17,27,0.1)
    .supports:last-child
      border-bottom: none
  .seller-pic
    padding: 18px 0 18px 18px
    .title
      margin-bottom: 12px
      font-size: 14px
      color: rgb(7,17,27)
      line-height: 14px
    .pics
      display: flex
      width: 100%
      overflow: auto
      .pic
        margin-right: 6px
  .seller-info
    padding: 18px 0 0 18px
    .title
      margin-bottom: 12px
      font-size: 14px
      color: rgb(7,17,27)
      line-height: 14px
    .infos
      padding: 16px 0
      font-size: 12px
      color: rgb(7,17,27)
      line-height: 16px
      border-top: 1px solid rgba(7,17,27,0.1)
    .infos.last-child
      border-bottom: none
</style>
