import _ from 'lodash'
import {mutations as rawMutations, initState} from './mutations'
import * as rawActions from './actions'

let options = {
    resolve: state => state,
    prefix: 'b9m_'
}
let externalStore = {state: {}}

export function config (params) {
    options = _.merge(options, params)
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

export function setStore (store) {
    externalStore = store
}

export function getState () {
    return options.resolve(externalStore.state)
}

export function actions (...names) {
    return _.reduce(names, (acts, name) => {
        acts[name] = function () {
            return externalStore.actions[options.prefix + name](...arguments)
        }
        return acts
    }, {})
}
