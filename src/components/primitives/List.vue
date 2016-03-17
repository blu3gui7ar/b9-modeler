<template>
    <div>
        <label>{{nodename}}:</label>
        <div @click="onAppend">Append</div>
        <div v-for="value in nodedata" track-by="$index">
            <component :is='component(nodemeta.value)'
                       :nodename='$index'
                       :noderef='$index'
                       :metaname='nodemeta.value'
                       :nodedata='value'>
            </component>
            <span @click="onRemove($index)">Remove</span>
        </div>
    </div>
</template>

<script>
import commons from './commons'
import metacomp from '../metacomp'
import ListHandler from './ListHandler'

export default {
    mixins: [commons, metacomp],
    props: {
        nodedata: Array
    },
    methods: {
        onAppend (e) {
            this.$parent.$emit('update', this.noderef, target => target.splice(target.length, 0, ''))
        },
        onRemove (child) {
            this.$parent.$emit('update', this.noderef, target => target.splice(child, 1))
        },
        onUpdate (child, modify) {
            this.$parent.$emit('update', this.noderef, target => modify(target[child]))
        },
        onSet (child, value) {
            this.$parent.$emit('update', this.noderef, target => target.splice(child, 1, value))
        }
    },
    handler (metadata, metaname) {
        return new ListHandler(metadata, metaname)
    }
}
</script>
