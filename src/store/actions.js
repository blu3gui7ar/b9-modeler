import {
    SET_DATA,
    ADD_NODE,
    ACTIVATE_NODE,
    DELETE_NODE,
    EDIT_NODE,
    FOLD_NODE,
    MODIFY_PLAIN,
    SET_PLAIN,
    RELOCATE_NODE,
    INIT_LAYOUT,
    NAV_NODE,
    MODIFY_NODE_NAME
} from './mutation-types'

export const initLayout = ({ dispatch }, height, width) => {
    dispatch(INIT_LAYOUT, height, width)
}

export const init = ({ dispatch }, metadata, data, root = 'ROOT', rootMeta = 'model', fold = true) => {
    dispatch(SET_DATA, metadata, data, root, rootMeta, fold)
    dispatch(RELOCATE_NODE)
}

export const addNode = ({ dispatch }, node, child) => {
    if (node._children) {
        dispatch(FOLD_NODE, node)
    }
    dispatch(ADD_NODE, node, child)
    dispatch(RELOCATE_NODE)
}

export const activateNode = ({ dispatch }, node) => {
    dispatch(ACTIVATE_NODE, node)
}

export const deleteNode = ({ dispatch }, node) => {
    dispatch(DELETE_NODE, node)
    dispatch(RELOCATE_NODE)
}

export const editNode = ({ dispatch }, node) => {
    dispatch(EDIT_NODE, node)
}

export const foldNode = ({ dispatch }, node) => {
    dispatch(FOLD_NODE, node)
    dispatch(RELOCATE_NODE)
}

export const modifyPlain = ({ dispatch }, plain, modify) => {
    dispatch(MODIFY_PLAIN, plain, modify)
}

export const setPlain = ({ dispatch }, node, value) => {
    dispatch(SET_PLAIN, node, value)
}

export const navigateNode = ({ dispatch }, node) => {
    dispatch(NAV_NODE, node)
    dispatch(RELOCATE_NODE)
}

export const modifyNodeName = ({ dispatch }, node, modify) => {
    dispatch(MODIFY_NODE_NAME, node, modify)
}
