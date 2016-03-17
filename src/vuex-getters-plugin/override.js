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
        const { vuex, parent } = options

        let _module
        if (parent && parent.$options && parent.$options.vuex && parent.$options.vuex.module) {
            _module = parent.$options.vuex.module
        }
        if (vuex) {
            let { module, getters, _wrapped } = vuex
            if (module) {
                _module = module
            }
            if (getters && _module && !_wrapped) {
                let moduleGetters = {}
                Object.keys(getters).forEach(key => {
                    moduleGetters[key] = state => getters[key](state[_module])
                })
                vuex.module = _module
                vuex.getters = moduleGetters
                vuex._wrapped = true
            }
        } else {
            options.vuex = { module: _module }
        }
    }
}

