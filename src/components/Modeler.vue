<template>
    <div>
        <tree-graph v-if="showGraph" :model="model" :width='500' :height='700'></tree-graph>
        <plain-editor v-if="showPlain" :node="editingNode"></plain-editor>
        <pre>{{data | json}}</pre>
    </div>
</template>

<script>
import TreeGraph from './TreeGraph.vue'
import PlainEditor from './PlainEditor.vue'
import { metadata, model, rootMeta, editingNode } from './getters'
import { foldNode } from './actions'

export default {
    computed: {
        data () {
            return this.metadata.fromGraphModel(this.model, this.rootMeta)
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
            this.foldNode(this.model)
        }
    },
    events: {
        fold: 'onFold'
    },
    components: {
        'tree-graph': TreeGraph,
        'plain-editor': PlainEditor
    },
    vuex: {
        getters: {
            model,
            metadata,
            rootMeta,
            editingNode
        },
        actions: {
            foldNode
        }
    }
}
</script>
