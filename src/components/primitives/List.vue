<template>
    <div>
        <label>{{nodename}}:</label>
        <div @click="onAppend">Append</div>
        <div v-for="value in nodedata" track-by="$index">
            <component :is='component(nodemeta.value)'
                       :nodename='$index'
                       :noderef='$index'
                       :metaname='nodemeta.value'
                       :nodedata='value'
                       :config='config'>
            </component>
            <span @click="onRemove($index)">Remove</span>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import commons from './commons'
import metacomp from '../metacomp'
import DefaultHandler from '../DefaultHandler'

export class ListHandler extends DefaultHandler {
    defaultData () {
        return []
    }
    hasNode () {
        const metadata = this.metadata
        const nodemeta = this.nodemeta
        if (nodemeta.flatten) {
            let v = nodemeta.value
            return metadata.handler(v).hasNode(metadata, metadata.meta(v))
        } else {
            return true
        }
    }
    childMetaName (childName, childKey) {
        return this.nodemeta.value
    }
    createChildModel (graphModel, childName, childData, childKey) {
        const childModel = super.createChildModel(graphModel, childName, childData, childKey)
        childModel.name = childName + '[' + childModel.id + ']'
        childModel.key = childModel.id
        return childModel
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
        return _(data || this.defaultData()).reduce((graphModel, subData, index) => {
            if (hasNode) {
                let subModel = subHandler.toGraphModel(subData)
                subModel.name = v + '[' + subModel.id + ']'// + ': ' + subData
                subModel.key = subModel.id
                subModel.metaname = v
                graphModel.children.push(metadata.wrap(subModel))
            } else {
                graphModel.plain[index] = subData
            }
            return graphModel
        }, this.metadata.wrap({plain: []}))
    }
    toData (graphModel) {
        let d = []
        const children = graphModel._children || graphModel.children
        if (children) {
            for (const childModel of children) {
                const subData = this.metadata.handler(childModel.metaname).toData(childModel)
                d.push(subData)
            }
        }

        if (graphModel.plain !== undefined) {
            d = [...graphModel.plain, ...d]
        }
        return _.filter(d, x => x !== null && x !== undefined)
    }
}

export default {
    mixins: [commons, metacomp],
    props: {
        nodedata: Array
    },
    methods: {
        onAppend (e) {
            this.$parent.$emit('update', this.noderef, target => target.splice(target.length, 0, ''))
        },
        onRemove (child) {
            this.$parent.$emit('update', this.noderef, target => target.splice(child, 1))
        },
        onUpdate (child, modify) {
            this.$parent.$emit('update', this.noderef, target => modify(target[child]))
        },
        onSet (child, value) {
            this.$parent.$emit('update', this.noderef, target => target.splice(child, 1, value))
        }
    },
    handler (metadata, metaname) {
        return new ListHandler(metadata, metaname)
    }
}
</script>
