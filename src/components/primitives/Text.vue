<template>
    <label>{{nodename}}:
        <input type='text' :value='nodedata' @input="onInput"></input>
    </label>
</template>

<script>
import commons from './commons'
import metacomp from '../metacomp'
import DefaultHandler from '../DefaultHandler'

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
    handler (metadata, metaname) {
        return new DefaultHandler(metadata, metaname)
    }
}
</script>
