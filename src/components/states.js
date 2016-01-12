import _ from 'lodash'
import { getState } from '../store'

export function rootMeta() {
    return getState().rootMeta
}
export function metadata () {
    return getState().metadata
}
export function model () {
    return getState().model
}
export function nodes () {
    return getState().nodes
}
export function links () {
    return _.toArray(getState().linkMap)
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
