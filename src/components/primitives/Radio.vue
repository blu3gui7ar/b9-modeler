<template>
    <div>
        <label>{{nodename}}
            <input type='radio' value='nodedata'></input>
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
        graphModel (metadata, nodemeta, data) {
            return {plain: data}
        },
        asData (metadata, nodemeta, graphModel) {
            return graphModel.plain
        }
    }
}
</script>
