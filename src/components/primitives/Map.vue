<template>
    <div>
        <label>{{nodename}}: </label>
        <div v-for="(key, value) in nodedata">
                <component :is='component(nodemeta.value)'
                           :nodename='key'
                           :noderef='key'
                           :metaname='nodemeta.value'
                           :nodedata='value'
                           :config='config'>
                </component>
        </div>
    </div>
</template>

<script>
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
        return metadata.handler(v).hasNode(metadata, metadata.meta(v)) ? {v: true} : {}
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
}

export default {
    mixins: [commons, metacomp],
    props: {
        nodedata: Object
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
        return new MapHandler(metadata, metaname)
    }
}
</script>
