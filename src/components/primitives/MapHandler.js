import _ from 'lodash'
import DefaultHandler from '../DefaultHandler'

export default class MapHandler extends DefaultHandler {
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
