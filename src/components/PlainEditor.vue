<template>
    <component :is='component(node.metaname)'
               :nodename='node.name'
               :noderef='""'
               :metaname='node.metaname'
               :nodedata='node.plain'>
    </component>
</template>

<script>
import metacomp from './metacomp'
import { modifyPlain, setPlain } from './actions'

export default {
    mixins: [metacomp],
    props: {
        node: Object
    },
    methods: {
        onUpdate (child, modify) {
            this.modifyPlain(this.node.plain, modify)
        },
        onSet (child, value) {
            this.setPlain(this.node, value)
        }
    },
    vuex: {
        actions: {
            modifyPlain,
            setPlain
        }
    }
}
</script>
