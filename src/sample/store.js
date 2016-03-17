import Vue from 'vue'
import Vuex from 'vuex'
import { VuexGetters, store as b9m } from '../main'

// must before Vuex
Vue.use(VuexGetters)
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        b9m
    }
})
