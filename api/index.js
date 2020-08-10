import { get } from './helpers'

const getSeller = get('api/seller')
const getGoods = get('api/goods')
const getRatings = get('api/ratings')
const getFoods = get('api/foods')

export {
  getSeller,
  getGoods,
  getRatings,
  getFoods
}
