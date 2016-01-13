import _ from 'lodash'
import {mutations as rawMutations, initState} from './mutations'
import * as rawActions from './actions'

export default class Config {
    constructor (params) {
        this.options = _.merge({
            resolve: state => state,
            prefix: 'b9m_'
        }, params)
        this.store = {state: {}}
    }
    setStore (store) {
        this.store = store
    }
    getState () {
        return this.options.resolve(this.store.state)
    }
    actions (...names) {
        const options = this.options
        const store = this.store
        return _.reduce(names, (acts, name) => {
            acts[name] = function () {
                return store.actions[options.prefix + name](...arguments)
            }
            return acts
        }, {})
    }
    action (name) {
        const options = this.options
        const store = this.store
        return function () {
            return store.actions[options.prefix + name](...arguments)
        }
    }
    customized () {
        const options = this.options
        const cssPrefix = options.cssPrefix || options.prefix.replace(/_/g, '-')
        const mutationPrefix = options.mutationPrefix || options.prefix.toUpperCase()
        const actionPrefix = options.actionPrefix || options.prefix.toLowerCase()

        const mutations = _(rawMutations).mapValues(mutation => function (state, ...args) {
            return mutation(options.resolve(state), ...args)
        })
        .mapKeys((value, key) => mutationPrefix + key)
        .value()

        const actions = _(rawActions).mapValues(act => ({ dispatch: rawDispatch }, ...args) => {
            const store = {
                dispatch (mutation, ...args) {
                    rawDispatch(mutationPrefix + mutation, ...args)
                }
            }
            return act(store, ...args)
        })
        .mapKeys((value, key) => actionPrefix + key)
        .value()

        return {
            state: { ...initState, cssPrefix: cssPrefix },
            mutations: mutations,
            actions: actions
        }
    }
    getData () {
        const state = this.getState()
        return JSON.stringify(state.metadata.fromGraphModel(state.model, state.rootMeta))
    }
}
