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
    hasNode () {
        return false
    }
}

export default {
    mixins: [commons, metacomp],
    props: {
        nodedata: Array
    },
    computed: {
        textlist () {
            return _.reduce(this.nodedata, (str, item) => {
                return str + item + '\n'
            }, '').trim()
        }
    },
    methods: {
        onInput (e) {
            const textlist = e.target.value.split('\n')
            const limit = this.nodemeta.limit || textlist.length
            this.$parent.$emit('set', this.noderef, textlist.slice(0, limit))
        },
        onKeyPress (e) {
            const textlist = e.target.value.split('\n')
            const limit = this.nodemeta.limit || textlist.length
            if (textlist.length > limit) {
                e.preventDefault()
            }
        }

    },
    handler (metadata, metaname) {
        return new TextListHandler(metadata, metaname)
    }
}
</script>
