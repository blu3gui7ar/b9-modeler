import _ from 'lodash'
import {mutations as rawMutations, initState} from './mutations'
import * as rawActions from './actions'

const conf = {
    resolve: state => state,
    prefix: 'b9m_',
    store: {state: {}}
}

export function config (resolve, prefix, cssPrefix) {
    conf.resolve = resolve || conf.resolve
    conf.prefix = prefix || conf.prefix
    cssPrefix = cssPrefix || conf.prefix.replace(/_/g, '-')
    const mutations = _(rawMutations).mapValues(mutation => function (state, ...args) {
        return mutation(conf.resolve(state), ...args)
    })
    .mapKeys((value, key) => conf.prefix.toUpperCase() + key)
    .value()

    const actions = _(rawActions).mapValues(act => ({ dispatch: rawDispatch }, ...args) => {
        const store = {
            dispatch (mutation, ...args) {
                rawDispatch(conf.prefix.toUpperCase() + mutation, ...args)
            }
        }
        return act(store, ...args)
    })
    .mapKeys((value, key) => conf.prefix + key)
    .value()

    return {
        state: { ...initState, cssPrefix: cssPrefix },
        mutations: mutations,
        actions: actions
    }
}

export function setStore (store) {
    conf.store = store
}

export function getState () {
    return conf.resolve(conf.store.state)
}

export function actions (...names) {
    return _.reduce(names, (acts, name) => {
        acts[name] = function () {
            return conf.store.actions[conf.prefix + name](...arguments)
        }
        return acts
    }, {})
}
