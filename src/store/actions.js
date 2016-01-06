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

export const initModeler = ({ dispatch }) => {
    const metaDesc = {
        model: {type: 'object', flatten: true, attrs: {description: 'desc', attributes: 'attributes', styles: 'styles', imgs: 'images'}},
        desc: {type: 'map', flatten: true, value: 'info'},
        attributes: {type: 'list', value: 'attribute'},
        attribute: {type: 'ref', target: 'attribute:'},
        styles: {type: 'list', flatten: false, value: 'style'},
        style: {type: 'ref', target: 'style:'},
        images: {type: 'list', flatten: false, value: 'image'},
        image: {type: 'ref', target: 'image:'}
    }

    const data = {
        model: {
            description: {
                'title': 'Dress-Lily',
                'category': 'Wedding Dress',
                'color': 'Red'
            },
            attributes: [
                'attribute:123',
                'attribute:456',
                'attribute:789'
            ],
            styles: [
                'style:123',
                'style:456',
                'style:789'
            ],
            imgs: [
                'image:123',
                'image:456',
                'image:789'
            ]
        }
    }

    dispatch(SET_DATA, metaDesc, data)
}

export const addNode = ({ dispatch }, node, child) => {
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
