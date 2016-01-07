import {
    SET_DATA,
    ADD_NODE,
    ACTIVATE_NODE,
    EDIT_NODE,
    FOLD_NODE,
    DELETE_NODE,
    MODIFY_PLAIN,
    SET_PLAIN
} from './mutation-types'
import _ from 'lodash'
import Vue from 'vue'
import Metadata, { basic } from '../components/Metadata'

export const modelerInitialState = basic

export const modelerMutations = {
    [SET_DATA] (state, metaDesc, data) {
        const metadata = new Metadata(metaDesc)
        const model = metadata.toGraphModel(data.model, 'model', 'model', true)
        state.metadata = metadata
        state.activeNode = model
        state.editingNode = model
        state.relocateSource = model
        state.model = model
    },
    [ADD_NODE] (state, node, child) {
        const metadata = state.metadata
        const handler = metadata.handler(node.metaname)
        const newModel = handler.createChildModel(node, child)
        if (!node.children) {
            Vue.set(node, 'children', [])
            node.children.push(newModel)
        } else {
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
        } else if (Array.isArray(node.children) && node.children.length > 0) {
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
    }
}
