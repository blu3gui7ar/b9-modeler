export default class DefaultHandler {
    constructor (metadata, metaname) {
        this.metadata = metadata
        this.metaname = metaname
        this.nodemeta = metadata.meta(metaname)
    }
    defaultData () {
        return ''
    }
    hasNode () {
        return false
    }
    childGen (childModels) {
        return {}
    }
    childMetaName (childName, childKey) {
        return childName
    }
    createChildModel (graphModel, childName, childData, childKey) {
        childKey = (childKey === undefined ? childName : childKey)
        const childMetaName = this.childMetaName(childName, childKey)
        const childHandler = this.metadata.handler(childMetaName)
        const childModel = childHandler.toGraphModel(childData)
        childModel.name = childName
        childModel.key = childKey
        childModel.metaname = childMetaName
        return this.metadata.wrap(childModel)
    }
    toGraphModel (data) {
        data = (data === undefined ? this.defaultData() : data)
        return {plain: data}
    }
    toData (graphModel) {
        return graphModel.plain === undefined ? this.defaultData() : graphModel.plain
    }
}
