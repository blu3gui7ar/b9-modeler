<template>
    <div>
        <tree-graph v-if="showGraph" v-ref:graph :model="model" :width='500' :height='700'></tree-graph>
        <div>{{showContent}}</div>
        <plain-editor v-if="showPlain" :node="editing"></plain-editor>
    </div>
</template>

<script>
import TreeGraph from './TreeGraph.vue'
import PlainEditor from './PlainEditor.vue'
import { model } from './states'
import store from '../store'
const { initModeler, foldNode } = store.actions

export default {
    computed: {
        model,
        showContent () {
            return JSON.stringify(store.state.metadata.fromGraphModel(this.model, 'model'))
        },
        editing () {
            return store.state.editingNode
        },
        showGraph () {
            return this.model.name
        },
        showPlain () {
            return store.state.editingNode !== null && store.state.editingNode.name
        }
    },
    ready () {
        initModeler()
        foldNode(this.model)
    },
    components: {
        'tree-graph': TreeGraph,
        'plain-editor': PlainEditor
    }
}
</script>
