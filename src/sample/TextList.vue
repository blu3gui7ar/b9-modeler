<template>
    <label>{{nodename}}:
        <textarea @input="onInput" @keypress="onKeyPress">{{textlist}}</textarea>
    </label>
</template>

<script>
import _ from 'lodash'
import { commons, metacomp, DefaultHandler } from '../main'

export class TextListHandler extends DefaultHandler {
    defaultData () {
        return []
    }
}

export default {
    mixins: [commons, metacomp],
    props: {
        nodedata: Array
    },
    computed: {
        textlist () {
            return _.join(this.nodedata, '\n')
        }
    },
    methods: {
        onInput (e) {
            const textlist = e.target.value.split('\n')
            const line = this.nodemeta.line || textlist.length
            this.$parent.$emit('set', this.noderef, textlist.slice(0, line))
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
        return new TextListHandler(metadata, metaname)
    }
}
</script>
