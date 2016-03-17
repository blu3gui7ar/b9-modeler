export default function (Vue) {
    // override init and inject vuex init procedure
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
        options.init = options.init
            ? [getterInit].concat(options.init)
            : getterInit
        _init.call(this, options)
    }

    function getterInit () {
        const options = this.$options
        if (options.parent && options.parent.$vuexModule) {
            this.$vuexModule = options.parent.$vuexModule
        }
        const { vuex } = options
        // vuex option handling
        if (vuex) {
            let { module, getters } = vuex
            // module
            if (module) {
                this.$vuexModule = module
            }
            // getters
            const _module = this.$vuexModule
            if (getters && _module) {
                let moduleGetters = {}
                Object.keys(getters).forEach(key => {
                    if (getters[key]._wrapped) {
                        moduleGetters[key] = getters[key]
                    } else {
                        moduleGetters[key] = state => getters[key](state[_module])
                        moduleGetters[key]._wrapped = true
                    }
                })
                vuex.getters = moduleGetters
            }
        }
    }
}

