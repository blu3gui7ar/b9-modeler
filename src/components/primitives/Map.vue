<template>
    <div>
        <label>{{nodename}}: </label>
        <div @click="onAppend">Append</div>
        <div v-for="tracked in tracker" track-by="org">
            <input type="text" @input="onInput($event, tracked)" @keypress="onKeyPress($event, tracked)" :value="tracked.curr"></input>
            <component :is='component(nodemeta.value)'
                       :nodename='""'
                       :noderef='tracked.curr'
                       :metaname='nodemeta.value'
                       :nodedata='nodedata[tracked.curr]'>
            </component>
            <span @click="onRemove($index)">Remove</span>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
import commons from './commons'
import metacomp from '../metacomp'
import MapHandler from './MapHandler'

export default {
    mixins: [commons, metacomp],
    data () {
        return {
            tracker: [],
            index: 0
        }
    },
    props: {
        nodedata: Object
    },
    methods: {
        onAppend (e) {
            this.$parent.$emit('update', this.noderef, target => {
                const key = 'NewKey' + (this.index++)
                Vue.set(target, key, '')
                this.tracker.push({org: key, curr: key})
            })
        },
        onRemove (tracked) {
            this.$parent.$emit('update', this.noderef, target => {
                Vue.delete(target, tracked.curr)
                this.tracker.$remove(tracked)
            })
        },
        onKeyPress (e, tracked) {
            const newKey = e.target.value + String.fromCharCode(e.keyCode)
            if (_.some(this.tracker, tracked => tracked.curr === newKey)) {
                e.preventDefault()
            }
        },
        onInput (e, tracked) {
            let child = e.target.value
            this.$parent.$emit('update', this.noderef, target => {
                Vue.set(target, child, target[tracked.curr])
                Vue.delete(target, tracked.curr)
                tracked.curr = child
            })
        },
        onUpdate (child, modify) {
            this.$parent.$emit('update', this.noderef, target => modify(target[child]))
        },
        onSet (child, value) {
            this.$parent.$emit('update', this.noderef, target => Vue.set(target, child, value))
        }
    },
    created () {
        _(this.nodedata).forEach((value, key) => {
            this.tracker.push({org: key, curr: key})
        })
    },
    handler (metadata, metaname) {
        return new MapHandler(metadata, metaname)
    }
}
</script>
