import { getState } from '../store'

export function metadata () {
    return getState().metadata
}
export function model () {
    return getState().model
}
export function activeNode () {
    return getState().activeNode
}

export function editingNode () {
    return getState().editingNode
}

export function relocateSource () {
    return getState().relocateSource
}

export function cssPrefix () {
    return getState().cssPrefix
}
