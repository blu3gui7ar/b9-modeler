<template>
    <g :transform="transform" :class="btnClass">
        <path :d="icon"></path>
        <circle opacity=1e-6 r=12 cx=11 cy=12></circle>
    </g>
</template>

<script>
import { cssPrefix } from './getters'
export default {
    data () {
        return {
            icon: 'm 0,12.362183 10,12.883883 0,-4.883883 10,0 0,-16.0000004 -10,0 0,-4.2928932 z'
        }
    },
    props: {
        x: Number,
        y: Number
    },
    computed: {
        btnClass () {
            return {
                [this.cssPrefix + 'graph-btn']: true,
                [this.cssPrefix + 'graph-btn-parent']: true
            }
        },
        transform () {
            return 'translate(' + this.y + ',' + this.x + ')'
        }
    },
    vuex: {
        getters: {
            cssPrefix
        }
    }
}
</script>
