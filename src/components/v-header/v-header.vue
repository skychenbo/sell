<template>
  <div class="v-header">
    <div class="content-wrapper">
      <div>
        <img :src="seller.avatar" class="avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand">
            <img src="./brand@2x.png" class="brand">
          </span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <span class="decrease">
            <img src="./decrease_1@2x.png" class="decrease">
          </span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports" class="support-count" @click="detailShow">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard-arrow-right"></i>
        </div>
      </div>
      <div class="bullentin-wrapper">
        <span class="bullentin-title">
          <img src="./bulletin@2x.png" class="bullentin-title">
        </span>
        <span class="bullentin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard-arrow-right"></i>
      </div>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-header',
  props: {
    seller: {
      type: Object,
      default () {
        return {
          support: []
        }
      }
    }
  },
  methods: {
    detailShow () {
      this.$emit('show', true)
    }
  }
}
</script>

<style scoped lang="stylus">
.v-header
  position: relative
  overflow: hidden
  height: 134px
  .content-wrapper
    height: 94px
    .avatar
      float: left
      margin: 24px 16px 18px 24px
      width: 64px;
      height: 64px;
      background-color: black;
    .content
      position: relative
      padding-top: 24px
      .title
        .brand
          margin-right: 3px
          width: 38px
          height: 22px
        .name
          vertical-align: middle
          font-size: 16px
          color: rgb(255,255,255)
          font-weight: 700
          line-height: 18px
      .description
        margin: 8px 0 10px 0
        font-size: 12px
        color: rgb(255,255,255)
        font-weight: 200
        line-height: 12px
      .support
        font-size: 10px
        color: rgb(255,255,255)
        font-weight: 200
        height: 12px
        line-height: 12px
        .decrease
          margin-right: 2px
          width: 15px
          height: 15px
      .support-count
        display: flex
        align-items: center
        position: absolute
        bottom: 14px
        right: 12px
        padding: 0 8px
        height: 24px
        line-height: 24px
        text-align: center
        border-radius: 14px
        background-color: rgba(0,0,0,0.2)
        .count
          font-size: 10px
          color: rgb(255,255,255)
          font-weight: 200
        .icon-keyboard-arrow-right
          display: inline-block
          margin-left: 2px
          width: 4px
          height: 4px
          border: 1px solid rgb(255,255,255)
          transform: rotate(45deg)
          border-left: transparent
          border-bottom: transparent
  .background
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: -1
    filter: blur(10px)
  .bullentin-wrapper
    box-sizing: border-box
    display: flex
    position relative
    padding: 0 12px 0
    width: 100%
    height: 28px
    line-height: 28px
    background-color: rgba(7,17,27,0.2)
    .bullentin-title
      flex: 0 0 30px
      margin-right: 4px
      width: 30px
      height: 15px
    .bullentin-text
      padding: 0 4px
      flex: 1
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      font-size: 10px
      color: rgb(255,255,255)
      vertical-align: middle
    .icon-keyboard-arrow-right
      position: absolute
      right: 12px
      top: 50%
      transform: translateY(-50%) rotate(45deg)
      margin-left: 4px
      flex: 0 0 20px
      display: inline-block
      width: 4px
      height: 4px
      border: 1px solid rgb(255,255,255)
      border-left: transparent
      border-bottom: transparent
</style>
