<template>
    <svg :width='width' :height='height'>
        <g :transform="transform">
            <tree-graph-link v-for="link in links" :link="link"></tree-graph-link >
            <tree-graph-node v-ref:gns v-for="node in nodes"
                :node="node" :active="isActive(node)" :editing="isEditing(node)">
            </tree-graph-node>
        </g>
    </svg>
</template>

<script>
import _ from 'lodash'
import d3 from 'd3'
const layout = d3.layout.tree()

import TreeGraphNode from './TreeGraphNode'
import TreeGraphLink from './TreeGraphLink'
import store from '../store'
// const { addNode } = store.actions

export default {
    data () {
        return {
            linkMap: {},
            left: 50,
            right: 100,
            top: 10,
            bottom: 10
        }
    },
    props: {
        model: Object,
        width: Number,
        height: Number
    },
    computed: {
        nodes () {
            const nodes = layout.nodes(this.model).reverse()
            this.linkMap = _.reduce(layout.links(nodes), (newMap, link) => {
                const l = this.linkMap[link.target.id]
                newMap[link.target.id] = (l !== undefined) ? l : link
                return newMap
            }, {})

            return nodes
        },
        links () {
            return _.toArray(this.linkMap)
        },
        transform () {
            return 'translate(' + this.left + ',' + this.top + ')'
        }
    },
    methods: {
        isActive (node) {
            return store.state.activeNode === node
        },
        isEditing (node) {
            return store.state.editingNode === node
        }
    },
    created () {
        layout.size([this.height - this.top - this.bottom, this.width - this.left - this.right])
    },
    components: {
        'tree-graph-node': TreeGraphNode,
        'tree-graph-link': TreeGraphLink
    }
}
</script>
