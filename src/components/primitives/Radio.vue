<template>
    <div>
        <label>{{nodename}}:
            <template v-for="(name, choice) in nodemeta.choices">
                <label>{{name}}
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
import RadioHandler from './RadioHandler'

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
        return new RadioHandler(metadata, metaname)
    }
}
</script>
