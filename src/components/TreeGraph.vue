<template>
    <svg :width='width' :height='height'>
        <g :transform="transform">
            <tree-graph-link v-for="link in links" :link="link" :config='config'></tree-graph-link >
            <tree-graph-node v-ref:gns v-for="node in nodes" :config='config'
                :node="node" :active="isActive(node)" :editing="isEditing(node)">
            </tree-graph-node>
        </g>
    </svg>
</template>

<script>
import TreeGraphNode from './TreeGraphNode'
import TreeGraphLink from './TreeGraphLink'
import { nodes, links, editingNode, activeNode } from './states'
import config from './config'
import actions from './actions'
const { initLayout } = actions

export default {
    mixins: [config],
    data () {
        return {
            left: 50,
            right: 200,
            top: 10,
            bottom: 10
        }
    },
    props: {
        width: Number,
        height: Number
    },
    computed: {
        nodes,
        links,
        activeNode,
        editingNode,
        transform () {
            return 'translate(' + this.left + ',' + this.top + ')'
        }
    },
    methods: {
        isActive (node) {
            return this.activeNode === node
        },
        isEditing (node) {
            return this.editingNode === node
        }
    },
    created () {
        initLayout(this.config, this.height - this.top - this.bottom, this.width - this.left - this.right)
    },
    components: {
        'tree-graph-node': TreeGraphNode,
        'tree-graph-link': TreeGraphLink
    }
}
</script>
