import _ from 'lodash'

export function rootMeta (state) {
    return state.b9m.rootMeta
}
export function metadata (state) {
    return state.b9m.metadata
}
export function model (state) {
    return state.b9m.model
}
export function nodes (state) {
    return state.b9m.nodes
}
export function links (state) {
    return _.toArray(state.b9m.linkMap)
}
export function activeNode (state) {
    return state.b9m.activeNode
}
export function editingNode (state) {
    return state.b9m.editingNode
}
export function displayRoot (state) {
    return state.b9m.displayRoot
}
export function relocateSource (state) {
    return state.b9m.relocateSource
}
export function cssPrefix (state) {
    return state.b9m.cssPrefix
}
