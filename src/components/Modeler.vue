<template>
    <div>
        <tree-graph v-if="showGraph" :config='config' :model="model" :width='500' :height='700'></tree-graph>
        <div>{{showContent}}</div>
        <plain-editor v-if="showPlain" :config='config' :node="editingNode"></plain-editor>
    </div>
</template>

<script>
import TreeGraph from './TreeGraph.vue'
import PlainEditor from './PlainEditor.vue'
import { metadata, model, rootMeta, editingNode } from './states'
import config from './config'
import actions from './actions'
const { foldNode } = actions

export default {
    mixins: [config],
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
            foldNode(this.config, this.model)
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
