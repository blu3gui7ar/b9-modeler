<template>
    <label>{{nodename}}:
        <textarea @input="onInput" @keypress="onKeyPress">{{nodedata}}</textarea>
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
            this.$parent.$emit('set', this.noderef, e.target.value)
        },
        onKeyPress (e) {
            const length = e.target.value.split('\n').length + (e.keyCode === 13 ? 1 : 0)
            const line = this.nodemeta.line || length
            if (length > line) {
                e.preventDefault()
            }
        }
    },
    handler (metadata, metaname) {
        return new DefaultHandler(metadata, metaname)
    }
}
</script>
