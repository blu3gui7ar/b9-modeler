<template>
    <text :x="x" :y="y" :class="breadcrumClass">{{node.name}} &gt; </text>
</template>

<script>
import config from './config'
import { cssPrefix } from './states'

export default {
    mixins: [config],
    props: {
        x: Number,
        y: Number,
        node: Object
    },
    computed: {
        cssPrefix,
        breadcrumClass () {
            return {
                [this.cssPrefix + 'graph-breadcrum']: true
            }
        }
    }
}
</script>
