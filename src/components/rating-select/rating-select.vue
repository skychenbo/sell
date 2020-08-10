<template>
  <div class="ratings-wrapper">
    <div class="ratings">
      <div class="rating-select">
        <span @click="$emit('change' , 2)" class="all button">全部<i class="count">{{commentNumber(2)}}</i></span>
        <span class="positive button" @click="$emit('change' , 0)">满意<i class="count">{{commentNumber(0)}}</i></span>
        <span class="negative button" @click="$emit('change' , 1)">吐槽<i class="count">{{commentNumber(1)}}</i></span>
      </div>
      <div class="all-content-ratings" @click="showText" ><i class="icon-check_circle icon" :class="{'color': visible}"></i><i class="see">只看有内容的评价</i>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'rating-select',
  props: {
    comments: {
      type: Array
      // default: () => ([])
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    commentNumber (type) {
      if (type === 2) {
        // 返回全部评价列表的长度
        return this.comments.length
      } else if (type === 1) {
        // 返回rateType为1的长度
        return this.comments.filter(val => val.rateType === 1).length
      } else if (type === 0) {
        // 返回rateType为0的长度
        return this.comments.filter(val => val.rateType === 0).length
      }
    },
    showText () {
      this.visible = !this.visible
      // 把showText方法，this.visible 传给父组件
      this.$emit('showText', this.visible)
    }
  }
}
</script>
<style lang="stylus" scoped>
.ratings-wrapper
  .ratings
    padding: 0 18px
    border-bottom: 1px solid rgba(7,17,27,0.1)
    .rating-select
      padding-bottom: 18px
      border-bottom: 1px solid rgba(7,17,27,0.1)
      .button
        padding: 8px 12px
        margin-right: 6px
        display: inline-block
        font-size: 12px
        line-height: 16px
        background-color: rgba(77,85,93,0.2)
        border-radius: 8px
        .count
          margin-left: 2px
      .all
        background-color: rgb(0,160,220)
        color: rgb(255,255,255)
      .positive
        background-color: rgba(0,160,220,0.2)
        color: rgb(77,85,93)
      .count
          font-size: 8px
    .all-content-ratings
      padding: 12px 18px
      color: rgb(147,153,159)
      line-height: 24px
      .see
        font-size: 12px
      .icon
        margin-right: 4px
        font-size: 24px
        vertical-align: middle
        &.color
          color: rgb(0,160,220)
</style>
