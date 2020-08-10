<template>
  <div id="app">
   <v-header @show="show" :seller="seller"></v-header>
   <header-detail @show="show" :visible="visible" :seller="seller"></header-detail>
   <div class="tab-wrapper">
     <tab :goods="goods"></tab>
   </div>
  </div>
</template>

<script>
import VHeader from './components/v-header/v-header'
import { getSeller } from '../api'
import HeaderDetail from './components/header-detail/header-detail'
import Seller from './components/seller/seller'
import Goods from './components/goods/goods'
import Ratings from './components/ratings/ratings'
import Tab from './components/tab/tab'
import Data from '../data.json'
import '../reset.css'
import './common/stylus/icon.styl'

export default {
  name: 'App',
  data () {
    return {
      info: {},
      seller: {},
      goods: {},
      visible: false,
      url: ''
    }
  },
  computed: {
    tab () {
      return [{
        label: '商品',
        component: Goods,
        data: {
          seller: this.seller
        }
      }, {
        label: '评价',
        component: Ratings,
        data: {
          seller: this.seller
        }
      }, {
        label: '商家',
        component: Seller,
        data: {
          seller: this.seller
        }
      }]
    }
  },
  created () {
    this.info = Data
    this.seller = this.info.seller
    this.goods = this.info.goods
    this.url = this.info.seller.avatar
    this._getSeller()
  },
  methods: {
    _getSeller () {
      getSeller({
        id: this.seller.id
      }).then((seller) => {
        this.seller = Object.assign({}, this.seller, seller)
      })
    },
    show (bool) {
      this.visible = bool
    }
  },
  components: {
    HeaderDetail,
    VHeader,
    Tab
  }
}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  color #2c3e50
  width 375px
  height 667px
</style>
