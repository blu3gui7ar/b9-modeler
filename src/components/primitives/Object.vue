<template>
    <div>
        <label>{{nodename}}: </label>
        <div v-for="(attr, childmeta) in attrs">
            <component :is='component(childmeta)'
                       :nodename='attr'
                       :nodekey='attr'
                       :metaname='childmeta'
                       :nodedata='attrData(attr)'>
            </component>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import commons from './commons'
import metacomp from '../metacomp'

export default {
    mixins: [commons, metacomp],
    props: {
        nodedata: Object
    },
    computed: {
        attrs () {
            return _.reduce(this.nodemeta.attrs, (attrs, metaname, key) => {
                const subHandler = this.metadata.handler(metaname)
                const subMeta = this.metadata.meta(metaname)
                if (!subHandler.hasNode(this.metadata, subMeta)) {
                    attrs[key] = metaname
                }
                return attrs
            }, {})
        }
    },
    methods: {
        attrData (attr) {
            return this.nodedata[attr] || this.metadata.handler(this.metaname).defaultValue()
        },
        onUpdate (child, modify) {
            this.$parent.$emit('update', this.nodekey, target => {
                modify(target[child])
            })
        },
        onSet (child, value) {
            this.$parent.$emit('update', this.nodekey, target => {
                target[child] = value
            })
        }
    },
    handler: {
        defaultValue () {
            return {}
        },
        hasNode (metadata, nodemeta) {
            if (nodemeta.flatten) {
                return _.some(nodemeta.attrs, type =>
                    metadata.handler(type).hasNode(metadata, metadata.meta(type))
                )
            } else {
                return true
            }
        },
        childGen (metadata, nodemeta) {
            let childNodes = []
            if (Array.isArray(nodemeta.attrs)) {
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

            return graphChildren => {
                const keys = _.pluck(graphChildren, 'key')
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
        },
        childmeta (nodemeta, attr) {
            if (Array.isArray(nodemeta.attrs)) {
                return attr
            } else {
                return nodemeta.attrs[attr]
            }
        },
        graphModel (metadata, nodemeta, data) {
            return _(data || this.defaultValue()).reduce((graphModel, subData, attr) => {
                let metaname = attr
                if (!Array.isArray(nodemeta.attrs)) {
                    metaname = nodemeta.attrs[attr]
                }
                const subHandler = metadata.handler(metaname)
                const subMeta = metadata.meta(metaname)
                if (subHandler.hasNode(metadata, subMeta)) {
                    const subModel = subHandler.graphModel(metadata, subMeta, subData)
                    subModel.name = attr
                    subModel.key = attr
                    subModel.metaname = metaname
                    graphModel.children.push(metadata.wrap(subModel))
                } else {
                    graphModel.plain[attr] = subData
                }
                return graphModel
            }, {children: [], plain: {}})
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
            }, {})

            if (graphModel.plain !== undefined) {
                d = {...graphModel.plain, ...d}
            }
            return d
        }
    }
}
</script>
