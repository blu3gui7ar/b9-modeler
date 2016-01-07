<template>
    <div v-for="(idx, value) in nodedata">
        <component :is='component(nodemeta.value)'
                   :nodename='idx'
                   :nodekey='idx'
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
        if (_.isArray(children)) {
            children.forEach((child, index) => child.name = child.metaname + '[' + index + ']')
        }
        childKey = childKey || (_.isArray(children) ? children.length : 0)
        childName = childName + '[' + childKey + ']'
        return super.createChildModel(graphModel, childName, childData, childKey)
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
                subModel.name = v + '[' + index + ']'// + ': ' + subData
                subModel.key = index
                subModel.metaname = v
                graphModel.children.push(metadata.wrap(subModel))
            } else {
                graphModel.plain[index] = subData
            }
            return graphModel
        }, {children: [], plain: []})
    }
    toData (graphModel) {
        const metadata = this.metadata
        const children = graphModel._children || graphModel.children
        let d = _.reduce(children, (data, childModel) => {
            const subData = metadata.handler(childModel.metaname).toData(childModel)
            data.push({index: childModel.key, data: subData})
            return data
        }, [])

        d = _(d).sortBy('index').pluck('data').value()

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
            this.$parent.$emit('update', this.nodekey, target => modify(target[child]))
        },
        onSet (child, value) {
            this.$parent.$emit('update', this.nodekey, target => target[child] = value)
        }
    },
    handler (metadata, metaname) {
        return new ListHandler(metadata, metaname)
    }
}
</script>
