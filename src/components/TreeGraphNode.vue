<template>
    <g :class="nodeClass" @mouseover="onMouseOver" transition="relocate">
        <circle r=6 :class="circleClass" @click="onCircleClick"></circle>
        <text x=15 y=3 text-anchor="start" @click="onTextClick">
            {{node.name}}
        </text>
        <tree-graph-parent-button :x='-25' :y='-41' v-if='canGoParent' @click="onGoParent" :config='config'>
        </tree-graph-parent-button>
        <tree-graph-remove-button :x='10' :y='-42' :valid='canRemove' @click="onRemove" :config='config'>
        </tree-graph-remove-button>
        <tree-graph-edit-button :x='10' :y='-12' @click="onEdit" :config='config'>
        </tree-graph-edit-button>
        <tree-graph-create-button v-for="(btn, enabled) in buttons" :valid='enabled' :name="btn"
                :x='10' :y='18 + 30 * $index'
                @click="onCreate(btn, enabled)" :config='config'>
        </tree-graph-create-button>
    </g>
</template>

<script>
import d3 from 'd3'
import TreeGraphRemoveButton from './TreeGraphRemoveButton'
import TreeGraphEditButton from './TreeGraphEditButton'
import TreeGraphCreateButton from './TreeGraphCreateButton'
import TreeGraphParentButton from './TreeGraphParentButton'

import { metadata, displayRoot, relocateSource, cssPrefix } from './states'
import config from './config'
import actions from './actions'
const { activateNode, addNode, deleteNode, editNode, foldNode, navigateNode } = actions

export default {
    mixins: [config],
    computed: {
        metadata,
        displayRoot,
        relocateSource,
        cssPrefix,
        transform () {
            return 'translate(' + this.node.y + ',' + this.node.x + ')'
        },
        canGoParent () {
            return this.displayRoot === this.node && this.node.parent !== undefined && this.node.parent !== null
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
        config: Object,
        node: Object,
        active: Boolean,
        editing: Boolean
    },
    methods: {
        onGoParent (e) {
            if (this.canGoParent) {
                navigateNode(this.config, this.node.parent)
            }
        },
        onCircleClick (e) {
            if (e.altKey) {
                navigateNode(this.config, this.node)
            } else {
                foldNode(this.config, this.node)
            }
        },
        onRemove (e) {
            if (this.canRemove) {
                deleteNode(this.config, this.node)
            }
        },
        onEdit (e) {
            editNode(this.config, this.node)
        },
        onCreate (child, valid) {
            if (valid) {
                addNode(this.config, this.node, child)
            }
        },
        onMouseOver () {
            activateNode(this.config, this.node)
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
        'tree-graph-create-button': TreeGraphCreateButton,
        'tree-graph-parent-button': TreeGraphParentButton
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
                // const source = this.relocateSource
                const source = this.config.getState().relocateSource
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
