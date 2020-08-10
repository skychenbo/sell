<template>
  <transition name="fade">
    <div v-show="visible" class="header-detail">
      <div class="name">{{ seller.name }}</div>
      <div class="star"></div>
      <div class="title">
        <span class="line"></span>
        <span class="text">优惠信息</span>
        <span class="line"></span>
      </div>
      <ul v-if="seller.supports" class="supports">
        <li v-for="item in seller.supports" :key="item.id" class="supports-item">
          <span>{{item.type + 1 }}、</span>
          <span class="text">{{ item.description }}</span>
        </li>
      </ul>
      <div class="title">
        <span class="line"></span>
        <span class="text">商家公告</span>
        <span class="line"></span>
      </div>
      <div class="bulletin">{{seller.bulletin}}</div>
      <div class="detail-close" @click="hide"><i class="close" :style="{fontSize: 55 + 'px'}">×</i></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'header-detail',
  props: {
    seller: {
      type: Object,
      default () {
        return {
          supports: []
        }
      }
    },
    visible: Boolean
  },
  data () {
    return {
    }
  },
  methods: {
    hide () {
      this.$emit('show', false)
    }
  }
}
</script>

<style scoped lang=stylus>
.header-detail
  position: fixed
  z-index: 999
  top: 0
  left: 0
  backdrop-filter: blur(10px)
  opacity: 1
  background: rgba(7,17,27,0.8)
  width: 100%
  height: 100%
  .name
    margin: 64px 0 16px
    font-size: 16px
    font-weight: 700
    color: rgb(255,255,255)
    line-height: 16px
    text-align: center
  .star
    height: 24px
  .title
    padding: 0 36px
    display: flex
    flex: 80%
    margin: 28px auto 24px auto
    .text
      margin: 0 12px
      color: rgb(255,255,255)
    .line
      flex: 1
      position: relative
      top: -9px
      border-bottom: 1px solid rgba(255, 255, 255, 0.2)
  .supports
    width: 80%
    margin: 0 auto
    .supports-item
      margin-bottom: 12px
      font-size: 12px
      font-weight: normal
      color: rgb(255,255,255)
      line-height: 12px
  .bulletin
    padding: 0 26px
    font size 12px
    font-weight: normal
    color: rgb(255,255,255)
    line-height: 24px
  .detail-close
    position: absolute
    left: 50%
    bottom: 32px
    transform: translateX(-50%)
    color: rgba(255,255,255,0.8)
</style>
