import Vue from 'vue'
import VueRouter from 'vue-router'
import Seller from '../components/seller/seller.vue'
import Goods from '../components/goods/goods'
import Ratings from '../components/ratings/ratings'
import Food from '../components/food/food'

Vue.use(VueRouter)
const routes = [{
  path: '/',
  name: 'goods',
  component: Goods
}, {
  path: '/goods',
  name: 'goods',
  component: Goods
}, {
  path: '/ratings',
  name: 'ratings',
  component: Ratings
}, {
  path: '/seller',
  name: 'seller',
  component: Seller
}, {
  path: '/food',
  name: 'food',
  component: Food
}]
const router = new VueRouter({
  routes
})
// router.go('/seller')

export default router
