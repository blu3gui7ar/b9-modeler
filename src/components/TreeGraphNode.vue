<template>
    <g class="node" :class="{'node-active':active}" @mouseover="onMouseOver" transition="relocate">
        <circle r=6 :style="{fill:cirleFill}" @click="onCircleClick"></circle>
        <text x=15 y=3 text-anchor="start" style="{fill-opacity: 1}" @click="onTextClick">
            {{node.name}}
        </text>
        <tree-graph-remove-button :x='10' :y='-42' :show='canRemove' @click="onRemove">
        </tree-graph-remove-button>
        <tree-graph-edit-button :x='10' :y='-12' :show='active' @click="onEdit">
        </tree-graph-edit-button>
        <tree-graph-create-button v-for="(btn, enabled) in buttons" :show='active' :valid='enabled' :name="btn"
                :x='10' :y='18 + 30 * $index'
                @click="onCreate(btn, enabled)">
        </tree-graph-create-button>
    </g>
</template>

<style>
.node {
  position: relative;
  display: inline-block;
  font: 10px sans-serif;
}
.node circle {
  fill: white;
  stroke: steelblue;
  stroke-width: 1.5px;
}
.node-active > circle {
    stroke: red
}
.node-active * {
  display: inline-block;
}
</style>

<script>
import d3 from 'd3'
import TreeGraphRemoveButton from './TreeGraphRemoveButton.vue'
import TreeGraphEditButton from './TreeGraphEditButton.vue'
import TreeGraphCreateButton from './TreeGraphCreateButton.vue'

import store from '../store'
const { activateNode, addNode, deleteNode, editNode, foldNode } = store.actions

export default {
    computed: {
        transform () {
            return 'translate(' + this.node.y + ',' + this.node.x + ')'
        },
        canRemove () {
            return this.active && (this.node.parent !== undefined)
        },
        cirleFill () {
            if (this.editing) {
                return 'red'
            } else if (this.node._children !== null) {
                return 'lightsteelblue'
            } else {
                return 'white'
            }
        },
        buttons () {
            const metaname = this.node.metaname
            const metadata = store.state.metadata
            const handler = metadata.handler(metaname)
            const gen = handler.childGen(metadata, metadata.meta(metaname))
            return gen(this.node.children)
        }
    },
    props: {
        node: Object,
        active: Boolean,
        editing: Boolean,
        metadata: Object
    },
    methods: {
        canAdd (child) {
            return true
        },
        onCircleClick (e) {
            foldNode(this.node)
        },
        onRemove (e) {
            deleteNode(this.node)
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
                const source = store.state.relocateSource
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
                const source = store.state.relocateSource
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
