<template>
    <g :transform="transform" :class="btnClass">
        <title>{{name}}</title>
        <circle r=12 cx=7 cy=12></circle>
        <text x=7 y=17>{{name[0] | uppercase}}</text>
    </g>
</template>

<script>
import { cssPrefix } from './states'
export default {
    props: {
        name: String,
        x: Number,
        y: Number,
        valid: Boolean
    },
    computed: {
        cssPrefix,
        btnClass () {
            return {
                [this.cssPrefix + 'graph-btn']: true,
                [this.cssPrefix + 'graph-btn-add']: true,
                [this.cssPrefix + 'graph-btn-disabled']: !this.valid
            }
        },
        transform () {
            return 'translate(' + this.y + ',' + this.x + ')'
        }
    }
}
</script>
