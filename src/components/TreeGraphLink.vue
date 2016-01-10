<template>
    <path class="link" transition="relocate">
    </path>
</template>

<style scoped>
.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 1.5px;
}
</style>

<script>
import { relocateSource } from './states'
import d3 from 'd3'
const diagonal = d3.svg.diagonal().projection(d => [d.y, d.x])

export default {
    props: {
        link: Object
    },
    computed: {
        relocateSource
    },
    methods: {
        relocate (from, to) {
            d3.select(this.$el)
                .transition()
                .duration(500)
                .attr('d', diagonal(this.link))
        }
    },
    watch: {
        '{x: link.target.x, y: link.target.y}': 'relocate'
    },
    transitions: {
        'relocate': {
            css: false,
            enter (el, done) {
                const d3e = d3.select(el)
                d3e.attr('d', diagonal({source: this.relocateSource, target: this.relocateSource}))
                d3e.transition()
                    .duration(500)
                    .attr('d', diagonal(this.link))
                    .each('end', done)
            },
            leave (el, done) {
                const d3e = d3.select(el)
                d3e.transition()
                    .duration(500)
                    .attr('d', diagonal({source: this.relocateSource, target: this.relocateSource}))
                    .each('end', done)

            }
        }
    }
}
</script>
