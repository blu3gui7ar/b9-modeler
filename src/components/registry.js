import Vue from 'vue'
import _ from 'lodash'

class Registry {
    constructor () {
        this.repo = {}
    }
    register (name, component) {
        this.repo[name] = component
        Vue.component(this.getComponentName(name), component)
    }
    unregister (name) {
        delete this.repo[name]
    }
    get (name) {
        return this.repo[name]
    }
    getAll () {
        return this.repo
    }
    getComponentName (name) {
        return 'c-' + name
    }
    getComponents () {
        return _.mapKeys(this.repo, (v, k) => 'c-' + k)
    }
}

let registry = new Registry()

import primitives from './primitives'
for (let name in primitives) {
    registry.register(name, primitives[name])
}

export default registry
