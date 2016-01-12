import Vue from 'vue'
import Vuex from 'vuex'
import { Config } from '../main'

const b9mConf = new Config({
    resolve: state => state.modeler,
    prefix: 'b9m_'
})

const {
    state: b9state,
    mutations: b9mutations,
    actions: b9actions
} = b9mConf.customized()

Vue.use(Vuex)
// const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    // strict: debug, //cause call stack exceeded
    // middlewares: debug ? [Vuex.createLogger()] : [], // cause deepClone
    state: {
        modeler: b9state
    },
    mutations: b9mutations,
    actions: b9actions
})

b9mConf.setStore(store)

export { store as default, b9mConf}
