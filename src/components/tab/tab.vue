<template>
  <div class="tabs">
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
    </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<script>
export default {
  name: 'tab',
  props: {
    goods: {},
    type: Object,
    defalut () {
      return {}
    }
  }
}
</script>

<style lang="stylus" scoped>
.tab
  display: flex
  height: 40px
  line-height: 40px
  .tab-item
    display: block
    flex: 1
    font-size: 14px
    color: rgb(77,85,93)
    text-align: center
    border-bottom: 1px solid rgba(7,17,27,0.1)
</style>
