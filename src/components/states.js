import store from '../store'

export function metadata () {
    return store.state.metadata
}
export function model () {
    return store.state.model
}
export function activeNode () {
    return store.state.activeNode
}
