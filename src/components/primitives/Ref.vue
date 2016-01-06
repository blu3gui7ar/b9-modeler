<template>
    <label>{{nodename}}
        <input type='text' :value='nodedata' @input="onInput"></input>
    </label>
</template>

<script>
import commons from './commons'
import metacomp from '../metacomp'

export default {
    mixins: [commons, metacomp],
    props: {
        nodedata: String
    },
    methods: {
        onInput (e) {
            this.$parent.$emit('set', this.nodekey, e.target.value)
        }
    },
    handler: {
        defaultValue () {
            return ''
        },
        hasNode (metadata, nodemeta) {
            // return nodemeta.flatten !== undefined && !nodemeta.flatten
            return !nodemeta.flatten
        },
        graphModel (metadata, nodemeta, data) {
            return {plain: data}
        },
        asData (metadata, nodemeta, graphModel) {
            return graphModel.plain
        }
    }
}
</script>
