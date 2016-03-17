<template>
  <div id="app">
    <b9m></b9m>
  </div>
</template>

<script>
import './b9m'
import * as init from './data'
import { registry, Modeler as B9M, actions as b9mActions } from '../main'
import TextList from './TextList'
registry.register('textlist', TextList)

export default {
    components: {
        'b9m': B9M
    },
    ready () {
        this.b9m_init(init.metadata, init.data, 'ROOT', 'category', true, 'b9m-')
        this.$broadcast('fold')
    },
    vuex: {
        module: 'b9m',
        actions: {
            b9m_init: b9mActions.init
        }
    }
}
</script>
