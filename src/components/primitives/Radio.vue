<template>
    <div>
        <label v-el:root>{{nodename}}:
            <template v-for="choice in nodemeta.choices">
                <label>{{choice}}
                    <input type='radio' @click="onClick" :name="noderef"
                        :checked="isChecked(choice)" :value="choice">
                    </input>
                </label>
            </template>
        </label>
    </div>
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
        isChecked (choice) {
            return this.nodedata === choice
        },
        onClick (e) {
            this.$parent.$emit('set', this.noderef, e.target.value)
        }
    },
    handler (metadata, metaname) {
        return new DefaultHandler(metadata, metaname)
    }
}
</script>
