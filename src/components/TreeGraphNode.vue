<template>
    <g :class="nodeClass" @mouseover="onMouseOver" transition="relocate">
        <circle r=6 :class="circleClass" @click="onCircleClick"></circle>
        <text x=15 y=3 text-anchor="start" @click="onTextClick">
            {{node.name}}
        </text>
        <tree-graph-remove-button :x='10' :y='-42' :valid='canRemove' @click="onRemove">
        </tree-graph-remove-button>
        <tree-graph-edit-button :x='10' :y='-12' @click="onEdit">
        </tree-graph-edit-button>
        <tree-graph-create-button v-for="(btn, enabled) in buttons" :valid='enabled' :name="btn"
                :x='10' :y='18 + 30 * $index'
                @click="onCreate(btn, enabled)">
        </tree-graph-create-button>
    </g>
</template>

<script>
import d3 from 'd3'
import TreeGraphRemoveButton from './TreeGraphRemoveButton.vue'
import TreeGraphEditButton from './TreeGraphEditButton.vue'
import TreeGraphCreateButton from './TreeGraphCreateButton.vue'

import { metadata, relocateSource, cssPrefix } from './states'
import { actions } from '../store'
const { activateNode, addNode, deleteNode, editNode, foldNode } =
    actions('activateNode', 'addNode', 'deleteNode', 'editNode', 'foldNode')

export default {
    computed: {
        metadata,
        relocateSource,
        cssPrefix,
        transform () {
            return 'translate(' + this.node.y + ',' + this.node.x + ')'
        },
        canRemove () {
            return this.active && (this.node.parent !== undefined)
        },
        nodeClass () {
            return {
                [this.cssPrefix + 'graph-node']: true,
                [this.cssPrefix + 'graph-node-active']: this.active,
                [this.cssPrefix + 'graph-node-editing']: this.editing,
                [this.cssPrefix + 'graph-node-folded']: (this.node._children !== null)
            }
        },
        buttons () {
            const handler = this.metadata.handler(this.node.metaname)
            return handler.childGen(this.node.children || this.node._children)
        }
    },
    props: {
        node: Object,
        active: Boolean,
        editing: Boolean
    },
    methods: {
        onCircleClick (e) {
            if (e.altKey) {
                console.log('alt click')
            } else {
                foldNode(this.node)
            }
        },
        onRemove (e) {
            if (this.canRemove) {
                deleteNode(this.node)
            }
        },
        onEdit (e) {
            editNode(this.node)
        },
        onCreate (child, valid) {
            if (valid) {
                addNode(this.node, child)
            }
        },
        onMouseOver () {
            activateNode(this.node)
        },
        onTextClick () {
            /*
            var key = prompt("Input map key:", d.key);
            if (key != null){
                d.key = key;
                d3.select(this).text(function(d) {
                    var text = d.name;
                    if(d.key){
                        text += "["+d.key+"]";
                    }
                    return text;
                })
            }
            */
        },
        relocate (oldNode, newNode) {
            d3.select(this.$el).transition()
                .duration(500)
                .attr('transform', this.transform)
        }
    },
    components: {
        'tree-graph-remove-button': TreeGraphRemoveButton,
        'tree-graph-edit-button': TreeGraphEditButton,
        'tree-graph-create-button': TreeGraphCreateButton
    },
    watch: {
        '{x: node.x, y: node.y}': 'relocate'
    },
    transitions: {
        'relocate': {
            css: false,
            enter (el, done) {
                const d3e = d3.select(el)
                const source = this.relocateSource
                if (source) {
                    d3e.attr('transform', 'translate(' + source.y + ',' + source.x + ')')
                    d3e.transition()
                        .duration(500)
                        .attr('transform', this.transform)
                        .each('end', done)
                } else {
                    d3e.attr('transform', this.transform)
                    done()
                }
            },
            leave (el, done) {
                const d3e = d3.select(el)
                const source = this.relocateSource
                if (source && this.node.parent) { // root node do not need transition
                    d3e.transition()
                        .duration(500)
                        .attr('transform', 'translate(' + source.y + ',' + source.x + ')')
                        .each('end', done)
                } else {
                    done()
                }
            }
        }
    }
}
</script>
