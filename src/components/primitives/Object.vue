<template>
    <div>
        <label>{{nodename}}: </label>
        <div v-for="(attr, value) in nodedata">
            <component :is='component(attrMeta(attr))'
                       :nodename='attr'
                       :noderef='attr'
                       :metaname='attrMeta(attr)'
                       :nodedata='value'>
            </component>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import commons from './commons'
import metacomp from '../metacomp'
import DefaultHandler from '../DefaultHandler'

export class ObjectHandler extends DefaultHandler {
    defaultData () {
        return {}
    }
    hasNode () {
        if (this.nodemeta.flatten) {
            return _.some(this.nodemeta.attrs, type =>
                this.metadata.handler(type).hasNode(this.metadata, this.metadata.meta(type))
            )
        } else {
            return true
        }
    }
    childMetaName (childName, childKey) {
        if (_.isArray(this.nodemeta.attrs)) {
            return childName
        } else {
            return this.nodemeta.attrs[childName]
        }
    }
    childGen (childModels) {
        const metadata = this.metadata
        const nodemeta = this.nodemeta
        let childNodes = []
        if (_.isArray(nodemeta.attrs)) {
            childNodes = _.filter(nodemeta.attrs, metaname =>
                metadata.handler(metaname).hasNode(metadata, metadata.meta(metaname))
            )
        } else {
            childNodes = _(nodemeta.attrs)
                .map((metaname, name) => { return {m: metaname, n: name}})
                .filter(attr => metadata.handler(attr.m).hasNode(metadata, metadata.meta(attr.m)))
                .map(attr => attr.n)
                .value()
        }

        const keys = _.pluck(childModels, 'key')
        const disabled = _(childNodes).intersection(keys)
            .reduce((rs, key) => {
                rs[key] = false
                return rs
            }, {})
        const enabled = _(childNodes).difference(keys)
            .reduce((rs, key) => {
                rs[key] = true
                return rs
            }, {})
        return _.merge(enabled, disabled)
    }
    toGraphModel (data) {
        const metadata = this.metadata
        const nodemeta = this.nodemeta
        return _(data || this.defaultData()).reduce((graphModel, subData, attr) => {
            let metaname = attr
            if (!_.isArray(nodemeta.attrs)) {
                metaname = nodemeta.attrs[attr]
            }
            const subHandler = metadata.handler(metaname)
            if (subHandler.hasNode()) {
                const subModel = subHandler.toGraphModel(subData)
                subModel.name = attr
                subModel.key = attr
                subModel.metaname = metaname
                graphModel.children.push(metadata.wrap(subModel))
            } else {
                graphModel.plain[attr] = subData
            }
            return graphModel
        }, {children: [], plain: {}})
    }
    toData (graphModel) {
        const metadata = this.metadata
        const children = graphModel._children || graphModel.children
        let d = _.reduce(children, (data, childModel) => {
            const metaname = childModel.metaname
            const subHandler = metadata.handler(metaname)
            const subData = subHandler.toData(childModel)
            data[childModel.key] = subData
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
        attrMeta (attr) {
            return _.isArray(this.nodemeta.attrs) ? attr : this.nodemeta.attrs[attr]
        },
        onUpdate (child, modify) {
            this.$parent.$emit('update', this.noderef, target => modify(target[child]))
        },
        onSet (child, value) {
            this.$parent.$emit('update', this.noderef, target => target[child] = value)
        }
    },
    handler (metadata, metaname) {
        return new ObjectHandler(metadata, metaname)
    }
}
</script>
