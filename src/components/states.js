import _ from 'lodash'

export function rootMeta () {
    return this.config.getState().rootMeta
}
export function metadata () {
    return this.config.getState().metadata
}
export function model () {
    return this.config.getState().model
}
export function nodes () {
    return this.config.getState().nodes
}
export function links () {
    return _.toArray(this.config.getState().linkMap)
}
export function activeNode () {
    return this.config.getState().activeNode
}
export function editingNode () {
    return this.config.getState().editingNode
}
export function relocateSource () {
    return this.config.getState().relocateSource
}
export function cssPrefix () {
    return this.config.getState().cssPrefix
}
