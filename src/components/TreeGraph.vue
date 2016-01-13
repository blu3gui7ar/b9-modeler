<template>
    <svg :width='width' :height='height'>
        <g :transform="transform">
            <tree-graph-breadcrum v-for="breadcrum in breadcrums" :x="0" :y="top + $index * 20" :node="breadcrum" :config='config' @click="onBreadcrumClick(breadcrum)">
            </tree-graph-breadcrum>
            <tree-graph-link v-for="link in links" :link="link" :config='config'>
            </tree-graph-link >
            <tree-graph-node v-ref:gns v-for="node in nodes" :config='config'
                :node="node" :active="isActive(node)" :editing="isEditing(node)">
            </tree-graph-node>
        </g>
    </svg>
</template>

<script>
import _ from 'lodash'
import TreeGraphBreadcrum from './TreeGraphBreadcrum'
import TreeGraphNode from './TreeGraphNode'
import TreeGraphLink from './TreeGraphLink'
import { nodes, links, editingNode, activeNode, displayRoot } from './states'
import config from './config'
import actions from './actions'
const { initLayout, navigateNode } = actions

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
        displayRoot,
        breadcrums () {
            let breadcrums = []
            let node = this.displayRoot
            while (node.parent !== undefined && node.parent !== null) {
                console.log(node.name)
                breadcrums.push(node.parent)
                node = node.parent
            }
            return _(breadcrums).reverse().value()
        },
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
        },
        onBreadcrumClick (node) {
            if (node !== null && node !== undefined) {
                navigateNode(this.config, node)
            }
        }
    },
    created () {
        initLayout(this.config, this.height - this.top - this.bottom, this.width - this.left - this.right)
    },
    components: {
        'tree-graph-node': TreeGraphNode,
        'tree-graph-link': TreeGraphLink,
        'tree-graph-breadcrum': TreeGraphBreadcrum
    }
}
</script>
