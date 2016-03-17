import _ from 'lodash'
import DefaultHandler from '../DefaultHandler'

export default class ObjectHandler extends DefaultHandler {
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
        return this.nodemeta.attrs[childName]
    }
    childGen (childModels) {
        const metadata = this.metadata
        const nodemeta = this.nodemeta
        const childNodes = _(nodemeta.attrs)
                .map((metaname, name) => { return {m: metaname, n: name} })
                .filter(attr => metadata.handler(attr.m).hasNode(metadata, metadata.meta(attr.m)))
                .map(attr => attr.n)
                .value()

        const keys = _.map(childModels, 'key')
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
            const metaname = nodemeta.attrs[attr]
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
        }, this.metadata.wrap({plain: {}}))
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
    normalize (metaItem) {
        const attrs = metaItem.attrs
        if (_.isArray(attrs)) {
            return {...metaItem, attrs: _.zipObject(attrs, attrs)}
        } else {
            return metaItem
        }
    }
}
