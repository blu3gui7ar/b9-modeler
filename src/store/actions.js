import {
    SET_DATA,
    ADD_NODE,
    ACTIVATE_NODE,
    DELETE_NODE,
    EDIT_NODE,
    FOLD_NODE,
    MODIFY_PLAIN,
    SET_PLAIN
} from './mutation-types'

export const init = ({ dispatch }, metadata, data) => {
    dispatch(SET_DATA, metadata, data)
}

export const addNode = ({ dispatch }, node, child) => {
    if (node._children) {
        dispatch(FOLD_NODE, node)
    }
    dispatch(ADD_NODE, node, child)
}

export const activateNode = ({ dispatch }, node) => {
    dispatch(ACTIVATE_NODE, node)
}

export const deleteNode = ({ dispatch }, node) => {
    dispatch(DELETE_NODE, node)
}

export const editNode = ({ dispatch }, node) => {
    dispatch(EDIT_NODE, node)
}

export const foldNode = ({ dispatch }, node) => {
    dispatch(FOLD_NODE, node)
}

export const modifyPlain = ({ dispatch }, plain, modify) => {
    dispatch(MODIFY_PLAIN, plain, modify)
}

export const setPlain = ({ dispatch }, node, value) => {
    dispatch(SET_PLAIN, node, value)
}
