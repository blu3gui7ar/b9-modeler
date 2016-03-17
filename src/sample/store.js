import Vue from 'vue'
import Vuex from 'vuex'
import { VuexGetter, store as b9m } from '../main'

// must before Vuex
Vue.use(VuexGetter)
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        b9m
    }
})
