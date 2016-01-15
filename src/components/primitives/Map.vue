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
                       :nodedata='nodedata[tracked.curr]'
                       :config='config'>
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
import DefaultHandler from '../DefaultHandler'

export class MapHandler extends DefaultHandler {
    defaultData () {
        return {}
    }
    hasNode () {
        const metadata = this.metadata
        const nodemeta = this.nodemeta
        if (nodemeta.flatten) {
            const v = nodemeta.value
            return metadata.handler(v).hasNode(metadata, metadata.meta(v))
        } else {
            return true
        }
    }
    childMetaName (childName, childKey) {
        return this.nodemeta.value
    }
    childGen (childModels) {
        const metadata = this.metadata
        const nodemeta = this.nodemeta
        const v = nodemeta.value
        return metadata.handler(v).hasNode(metadata, metadata.meta(v)) ? {[v]: true} : {}
    }
    toGraphModel (data) {
        const metadata = this.metadata
        const nodemeta = this.nodemeta
        let v = nodemeta.value
        let subHandler = metadata.handler(v)
        let hasNode = subHandler.hasNode()
        return _(data || this.defaultData()).reduce((graphModel, subData, key) => {
            if (hasNode) {
                let subModel = subHandler.toGraphModel(subData)
                subModel.name = key
                subModel.key = key
                subModel.metaname = v
                graphModel.children.push(metadata.wrap(subModel))
            } else {
                graphModel.plain[key] = subData
            }
            return graphModel
        }, this.metadata.wrap({plain: {}}))
    }
    toData (graphModel) {
        const metadata = this.metadata
        const children = graphModel._children || graphModel.children
        let d = _.reduce(children, (data, childModel) => {
            const metaname = childModel.metaname
            const subHandler = metadata.handler(metaname)
            data[childModel.key] = subHandler.toData(childModel)
            return data
        }, {})

        if (graphModel.plain !== undefined) {
            d = {...graphModel.plain, ...d}
        }
        return d
    }
    modifiable (childKey) {
        return true
    }
    modifyGraphModel (subModel, newName) {
        subModel.name = newName
        subModel.key = newName
    }
    newNodeName (child) {
        return child + Math.floor(Math.random() * 100) + Date.now()
    }
}

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
