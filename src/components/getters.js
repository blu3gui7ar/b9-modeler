import _ from 'lodash'

export function rootMeta (state) {
    return state.rootMeta
}
export function metadata (state) {
    return state.metadata
}
export function model (state) {
    return state.model
}
export function nodes (state) {
    return state.nodes
}
export function links (state) {
    return _.toArray(state.linkMap)
}
export function activeNode (state) {
    return state.activeNode
}
export function editingNode (state) {
    return state.editingNode
}
export function displayRoot (state) {
    return state.displayRoot
}
export function relocateSource (state) {
    return state.relocateSource
}
export function cssPrefix (state) {
    return state.cssPrefix
}
