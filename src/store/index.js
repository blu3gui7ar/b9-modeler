import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'

import { modelerInitialState, modelerMutations } from './mutations'

Vue.use(Vuex)
// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    // strict: debug, //cause call stack exceeded
    // middlewares: debug ? [Vuex.createLogger()] : [], // cause deepClone
    state: modelerInitialState,
    mutations: modelerMutations,
    actions
})
