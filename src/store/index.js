import Vue from 'vue'
import Vuex from 'vuex'
import comment from './modules/comment'
import yonghu from './modules/yonghu'

Vue.use(Vuex)

export default new Vuex.Store({
 modules: {
   comment,
   yonghu
 }
})
