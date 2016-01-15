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
import _ from 'lodash'
import commons from './commons'
import metacomp from '../metacomp'
import DefaultHandler from '../DefaultHandler'

export class RadioHandler extends DefaultHandler {
    normalize (metaItem) {
        const choices = metaItem.choices
        if (_.isArray(choices)) {
            return {...metaItem, choices: _.zipObject(choices, choices)}
        } else {
            return metaItem
        }
    }
}

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
