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
            console.log(child, value)
            this.$parent.$emit('update', this.nodekey, target => {
                target[child] = value
            })
        }
    },
    handler: {
        defaultValue () {
            return []
        },
        hasNode (metadata, nodemeta) {
            if (nodemeta.flatten) {
                let v = nodemeta.value
                return metadata.handler(v).hasNode(metadata, metadata.meta(v))
            } else {
                return true
            }
        },
        childGen (metadata, nodemeta) {
            const v = nodemeta.value
            const cns = metadata.handler(v).hasNode(metadata, metadata.meta(v)) ? {[v]: true} : {}
            return graphChildren => cns
        },
        childmeta (nodemeta, child) {
            return child
        },
        graphModel (metadata, nodemeta, data) {
            let v = nodemeta.value
            let subHandler = metadata.handler(v)
            let subMeta = metadata.meta(v)
            let hasNode = subHandler.hasNode(metadata, subMeta)
            return _(data || this.defaultValue()).reduce((graphModel, subData, index) => {
                if (hasNode) {
                    let subModel = subHandler.graphModel(metadata, subMeta, subData)
                    subModel.name = v + '[' + index + ']'// + ': ' + subData
                    subModel.key = index
                    subModel.metaname = v
                    graphModel.children.push(metadata.wrap(subModel))
                } else {
                    graphModel.plain[index] = subData
                }
                return graphModel
            }, {children: [], plain: []})
        },
        asData (metadata, nodemeta, graphModel) {
            const children = graphModel._children || graphModel.children
            let d = _.reduce(children, (data, childModel) => {
                const metaname = childModel.metaname
                const subHandler = metadata.handler(metaname)
                const subMeta = metadata.meta(metaname)
                const subData = subHandler.asData(metadata, subMeta, childModel)
                data[childModel.key] = subData
                return data
            }, [])

            if (graphModel.plain !== undefined) {
                d = [...graphModel.plain, ...d]
            }
            return d
        }
    }
}
</script>
