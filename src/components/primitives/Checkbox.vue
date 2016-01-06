<template>
    <div>
        <label>{{nodename}}
            <input type='checkbox' value='nodedata'></input>
        </label>
    </div>
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
            return false
        },
        childGen (metadata, nodemeta) {
            return graphChildren => {}
        },
        childmeta (nodemeta, child) {
            return null
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
