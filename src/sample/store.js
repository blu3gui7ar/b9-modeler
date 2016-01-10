import Vue from 'vue'
import Vuex from 'vuex'
import { config, setStore } from '../main'

Vue.use(Vuex)
// const debug = process.env.NODE_ENV !== 'production'
const {state: b9state, mutations: b9mutations, actions: b9actions} = config(state => state.modeler, 'b9m_')

const store = new Vuex.Store({
    // strict: debug, //cause call stack exceeded
    // middlewares: debug ? [Vuex.createLogger()] : [], // cause deepClone
    state: {
        modeler: b9state
    },
    mutations: b9mutations,
    actions: b9actions
})

setStore(store)

export default store

