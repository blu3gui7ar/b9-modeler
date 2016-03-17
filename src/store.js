import {
    SET_DATA,
    ADD_NODE,
    ACTIVATE_NODE,
    EDIT_NODE,
    FOLD_NODE,
    DELETE_NODE,
    MODIFY_PLAIN,
    SET_PLAIN,
    RELOCATE_NODE,
    INIT_LAYOUT,
    NAV_NODE,
    MODIFY_NODE_NAME
} from './mutation-types'
import _ from 'lodash'
import d3 from 'd3'
import Vue from 'vue'
import Metadata from './components/Metadata'

const basicMeta = new Metadata({model: {type: 'object', attrs: []}})
const basicModel = basicMeta.toGraphModel({}, 'model', 'model', true)
const state = {
    metadata: basicMeta,
    model: basicModel,
    rootMeta: 'model',
    layout: d3.layout.tree(),
    nodes: [],
    linkMap: {},
    displayRoot: basicModel,
    activeNode: basicModel,
    editingNode: basicModel,
    relocateSource: basicModel,
    cssPrefix: ''
}

const mutations = {
    [SET_DATA] (state, metaDesc, data, root, rootMeta, fold, cssPrefix) {
        const metadata = new Metadata(metaDesc)
        const model = metadata.toGraphModel(data, root, rootMeta, fold)
        state.editingNode = model
        state.activeNode = model
        state.relocateSource = model
        state.displayRoot = model
        state.metadata = metadata
        state.model = model
        state.rootMeta = rootMeta
        state.cssPrefix = cssPrefix
    },
    [ADD_NODE] (state, node, child) {
        const metadata = state.metadata
        const handler = metadata.handler(node.metaname)
        const newModel = handler.createChildModel(node, child)
        if (_.isArray(node._children)) {
            node._children.push(newModel)
        } else if (_.isArray(node.children)) {
            node.children.push(newModel)
        } else {
            Vue.set(node, 'children', [])
            node.children.push(newModel)
        }
        state.relocateSource = {x: node.x, y: node.y}
    },
    [ACTIVATE_NODE] (state, node) {
        state.activeNode = node
    },
    [DELETE_NODE] (state, node) {
        if (node.parent) {
            node.parent.children = _.filter(node.parent.children, c => c !== node)
            state.relocateSource = node.parent
        }
    },
    [EDIT_NODE] (state, node) {
        state.editingNode = node
    },
    [FOLD_NODE] (state, node) {
        if (node._children !== null) {
            Vue.set(node, 'children', node._children)
            node._children = null
            state.relocateSource = {x: node.x, y: node.y}
        } else if (_.isArray(node.children) && node.children.length > 0) {
            node._children = node.children
            node.children = []
            state.relocateSource = node
        }
    },
    [MODIFY_PLAIN] (state, plain, modify) {
        modify(plain)
    },
    [SET_PLAIN] (state, node, value) {
        node.plain = value
    },
    [RELOCATE_NODE] (state) {
        state.nodes = state.layout.nodes(state.displayRoot).reverse()
        const links = state.layout.links(state.nodes)
        state.linkMap = _.reduce(links, (newMap, link) => {
            const l = state.linkMap[link.target.id]
            newMap[link.target.id] = (l !== undefined) ? l : link
            return newMap
        }, {})
    },
    [INIT_LAYOUT] (state, height, width) {
        state.layout.size([height, width])
    },
    [NAV_NODE] (state, node) {
        state.displayRoot = node
    },
    [MODIFY_NODE_NAME] (state, node, modify) {
        modify(node)
    }
}

export {
    state,
    mutations
}

