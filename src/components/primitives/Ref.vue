<template>
    <label>{{nodename}}
        <input type='text' :value='nodedata' @input="onInput"></input>
    </label>
</template>

<script>
import commons from './commons'
import metacomp from '../metacomp'
import RefHandler from './RefHandler'

export default {
    mixins: [commons, metacomp],
    props: {
        nodedata: String
    },
    methods: {
        onInput (e) {
            this.$parent.$emit('set', this.noderef, e.target.value)
        }
    },
    handler (metadata, metaname) {
        return new RefHandler(metadata, metaname)
    }
}
</script>
