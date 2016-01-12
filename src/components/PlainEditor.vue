<template>
    <component :is='component(node.metaname)'
               :nodename='node.name'
               :noderef='""'
               :metaname='node.metaname'
               :nodedata='node.plain'
               :config='config'>
    </component>
</template>

<script>
import config from './config'
import metacomp from './metacomp'
import actions from './actions'
const { modifyPlain, setPlain } = actions

export default {
    mixins: [metacomp, config],
    props: {
        node: Object
    },
    methods: {
        onUpdate (child, modify) {
            modifyPlain(this.config, this.node.plain, modify)
        },
        onSet (child, value) {
            setPlain(this.config, this.node, value)
        }
    }
}
</script>
