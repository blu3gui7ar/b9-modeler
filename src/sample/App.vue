<template>
  <div id="app">
    <b9m :config="config"></b9m>
  </div>
</template>

<script>
import './b9m'
import * as init from './data'
import store, { b9mConf } from './store'
const { b9m_init } = store.actions
import { Modeler as B9M } from '../main'

export default {
    data () {
        return {
            config: b9mConf
        }
    },
    components: {
        'b9m': B9M
    },
    ready () {
        b9m_init(init.metadata, init.data, 'ROOT', 'category', true)
        this.$broadcast('fold')
    }
}
</script>
