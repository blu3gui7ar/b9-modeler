<template>
    <div>
        <tree-graph v-if="showGraph" v-ref:graph :model="model" :width='500' :height='700'></tree-graph>
        <div>{{showContent}}</div>
        <plain-editor v-if="showPlain" :node="editingNode"></plain-editor>
    </div>
</template>

<script>
import TreeGraph from './TreeGraph.vue'
import PlainEditor from './PlainEditor.vue'
import { metadata, model, rootMeta, editingNode } from './states'
import { actions } from '../store'
const { foldNode } = actions('foldNode')

export default {
    computed: {
        model,
        metadata,
        rootMeta,
        editingNode,
        showContent () {
            return JSON.stringify(this.metadata.fromGraphModel(this.model, this.rootMeta))
        },
        showGraph () {
            return this.model.name !== undefined && this.model.name !== null
        },
        showPlain () {
            return this.editingNode !== null &&
                this.editingNode.name !== undefined && this.editingNode.name !== null
        }
    },
    methods: {
        onFold () {
            foldNode(this.model)
        }
    },
    ready () {
        this.$on('fold', this.onFold)
    },
    components: {
        'tree-graph': TreeGraph,
        'plain-editor': PlainEditor
    }
}
</script>
