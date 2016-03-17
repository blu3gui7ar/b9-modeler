<template>
    <div>
        <label>{{nodename}}:
            <select @change="onChange">
                <option :selected="isSelected()" :value="nothing">---</option>
                <template v-for="(name, option) in nodemeta.options">
                    <option :value="option" :selected="isSelected(optioin)">{{name}}</option>
                </template>
            </select>
        </label>
    </div>
</template>

<script>
import commons from './commons'
import metacomp from '../metacomp'
import SelectHandler from './SelectHandler'

export default {
    data () {
        return {
            nothing: '-_-undefined-_-'
        }
    },
    mixins: [commons, metacomp],
    props: {
        nodedata: String
    },
    methods: {
        isSelected (option) {
            return this.nodedata === option
        },
        onChange (e) {
            let v = e.target.value
            if (v === this.nothing) {
                v = undefined
            }
            this.$parent.$emit('set', this.noderef, v)
        }
    },
    handler (metadata, metaname) {
        return new SelectHandler(metadata, metaname)
    }
}
</script>
