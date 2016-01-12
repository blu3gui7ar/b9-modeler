<template>
    <path :class="linkClass" transition="relocate">
    </path>
</template>

<script>
import config from './config'
import { relocateSource, cssPrefix } from './states'
import d3 from 'd3'
const diagonal = d3.svg.diagonal().projection(d => [d.y, d.x])

export default {
    mixins: [config],
    props: {
        link: Object
    },
    computed: {
        relocateSource,
        cssPrefix,
        linkClass () {
            return {
                [this.cssPrefix + 'graph-link']: true
            }
        }
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
                const source = this.config.getState().relocateSource
                d3e.transition()
                    .duration(500)
                    .attr('d', diagonal({source: source, target: source}))
                    .each('end', done)

            }
        }
    }
}
</script>
