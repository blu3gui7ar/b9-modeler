<template>
    <div>
        <label>{{nodename}}: </label>
        <div v-for="attr in attrs">
            <component :is='component(attrMeta(attr))'
                       :nodename='attr'
                       :noderef='attr'
                       :metaname='attrMeta(attr)'
                       :nodedata='attrValue(attr)'>
            </component>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
import commons from './commons'
import metacomp from '../metacomp'
import ObjectHandler from './ObjectHandler'

export default {
    mixins: [commons, metacomp],
    props: {
        nodedata: Object
    },
    computed: {
        attrs () {
            if (!this.nodemeta) {
                return []
            }
            const metadata = this.metadata
            return _(this.nodemeta.attrs).pickBy((metaname) =>
                    !metadata.handler(metaname).hasNode(metadata, metadata.meta(metaname))
                )
                .keys()
                .value()
        }
    },
    methods: {
        attrMeta (attr) {
            return this.nodemeta.attrs[attr]
        },
        attrValue (attr) {
            return this.nodedata[attr] || this.metadata.handler(this.attrMeta(attr)).defaultData()
        },
        onUpdate (child, modify) {
            this.$parent.$emit('update', this.noderef, target => modify(target[child]))
        },
        onSet (child, value) {
            this.$parent.$emit('update', this.noderef, target => Vue.set(target, child, value))
        }
    },
    handler (metadata, metaname) {
        return new ObjectHandler(metadata, metaname)
    }
}
</script>
