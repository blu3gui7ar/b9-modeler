<template>
    <div>
        <label v-el:root>{{nodename}}:
            <template v-for="choice in nodemeta.choices">
                <label>{{choice}}
                    <input type='checkbox' @click="onClick" :name="nodekey"
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

export class CheckboxHandler extends DefaultHandler {
    defaultData () {
        return []
    }
}

export default {
    mixins: [commons, metacomp],
    props: {
        nodedata: Array
    },
    methods: {
        isChecked (choice) {
            return _.find(this.nodedata, item => item === choice) !== undefined
        },
        onClick (e) {
            let newData
            if (e.target.checked) {
                newData = _.union(this.nodedata, [e.target.value])
            } else {
                newData = _.filter(this.nodedata, item => item !== e.target.value)
            }
            this.$parent.$emit('set', this.noderef, newData)
        }
    },
    handler (metadata, metaname) {
        return new CheckboxHandler(metadata, metaname)
    }
}
</script>
