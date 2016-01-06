import registry from './registry'

export default class Metadata {
    constructor (desc) {
        this.desc = desc
        this.handlers = {}
    }
    type (name) {
        var type = 'text'
        if (undefined !== this.desc[name]) {
            var node = this.desc[name]
            type = node.type
        }
        return type
    }
    meta (name) {
        return this.desc[name]
    }
    component (name) {
        return registry.getComponentName(this.type(name))
    }
    handler (name) {
        return registry.get(this.type(name)).handler
    }
    wrap (node) {
        let wrapped = {
            name: (node.name === undefined ? 'NewNode' : node.name),
            metaname: (node.metaname === undefined ? '' : node.metaname),
            children: (node.children === undefined ? [] : node.children),
            _children: null,
            plain: (node.plain === undefined ? '' : node.plain),
            id: null,
            x: 0,
            y: 0
        }
        wrapped.key = (node.key === undefined ? wrapped.name : node.key)
        return wrapped
    }
    toGraphModel (data, name, metaname, fold = false) {
        metaname = metaname || name
        const handler = this.handler(name)
        const nodemeta = this.meta(name)
        let model = handler.graphModel(this, nodemeta, data)
        model.name = name
        model.metaname = metaname
        model = this.wrap(model)
        if (fold) {
            model._children = model.children
            model.children = []
        }
        return model
    }
    fromGraphModel (graphModel, name, metaname) {
        metaname = metaname || name
        const handler = this.handler(name)
        const nodemeta = this.meta(name)
        const data = {}
        data[name] = handler.asData(this, nodemeta, graphModel)
        return data
    }
}

const basicMeta = new Metadata({model: {type: 'object', attrs: []}})
const basicModel = basicMeta.toGraphModel({}, 'model', 'model', true)
export const basic = {
    metadata: basicMeta,
    model: basicModel,
    activeNode: basicModel,
    editingNode: basicModel,
    relocateSource: basicModel
}
