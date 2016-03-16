<template>
    <text :x="x" :y="y" :class="breadcrumClass">{{node.name}} &gt; </text>
</template>

<script>
import { cssPrefix } from './getters'

export default {
    props: {
        x: Number,
        y: Number,
        node: Object
    },
    computed: {
        breadcrumClass () {
            return {
                [this.cssPrefix + 'graph-breadcrum']: true
            }
        }
    },
    vuex: {
        getters: {
            cssPrefix
        }
    }
}
</script>
