<template>
    <div v-for="(idx, value) in nodedata">
        <component :is='component(nodemeta.value)'
                   :nodename='idx'
                   :noderef='idx'
                   :metaname='nodemeta.value'
                   :nodedata='value'
        >
        </component>
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
        const children = graphModel._children || graphModel.children
        childKey = childKey || (_.isArray(children) ? children.length : 0)
        const childModel = super.createChildModel(graphModel, childName, childData, childKey)
        childModel.name = childName + '[' + childModel.id + ']'
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
                subModel.key = index
                subModel.name = v + '[' + subModel.id + ']'// + ': ' + subData
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
        for (const childModel of children) {
            const subData = this.metadata.handler(childModel.metaname).toData(childModel)
            d.push(subData)
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
        onUpdate (child, modify) {
            this.$parent.$emit('update', this.noderef, target => modify(target[child]))
        },
        onSet (child, value) {
            this.$parent.$emit('update', this.noderef, target => target[child] = value)
        }
    },
    handler (metadata, metaname) {
        return new ListHandler(metadata, metaname)
    }
}
</script>
