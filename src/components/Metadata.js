import registry from './registry'

export default class Metadata {
    constructor (desc) {
        this.desc = desc
        this.count = 0
    }
    type (metaname) {
        var type = 'text'
        if (undefined !== this.desc[metaname]) {
            var node = this.desc[metaname]
            type = node.type
        }
        return type
    }
    meta (metaname) {
        return this.desc[metaname]
    }
    component (metaname) {
        return registry.getComponentName(this.type(metaname))
    }
    handler (metaname) {
        return registry.get(this.type(metaname)).handler(this, metaname)
    }
    wrap (node) {
        let wrapped = {
            name: (node.name === undefined ? 'NewNode' : node.name),
            metaname: (node.metaname === undefined ? '' : node.metaname),
            children: (node.children === undefined ? [] : node.children),
            _children: null,
            plain: (node.plain === undefined ? '' : node.plain),
            id: node.id || this.count++,
            x: 0,
            y: 0
        }
        wrapped.key = (node.key === undefined ? wrapped.name : node.key)
        return wrapped
    }
    toGraphModel (data, name, metaname, fold = false) {
        metaname = metaname || name
        const handler = this.handler(metaname)
        let model = handler.toGraphModel(data)
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
        const handler = this.handler(metaname)
        return {[name]: handler.toData(graphModel)}
    }
}
