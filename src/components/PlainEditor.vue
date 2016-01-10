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
import { actions } from '../store'
const { modifyPlain, setPlain } = actions('modifyPlain', 'setPlain')

export default {
    mixins: [metacomp],
    props: {
        node: Object
    },
    methods: {
        onUpdate (child, modify) {
            modifyPlain(this.node.plain, modify)
        },
        onSet (child, value) {
            setPlain(this.node, value)
        }
    }
}
</script>
