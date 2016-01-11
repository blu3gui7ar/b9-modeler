<template>
    <g :transform="transform" :class="btnClass">
        <path :d="icon"></path>
        <circle opacity=1e-6 r=12 cx=11 cy=12></circle>
    </g>
</template>

<script>
import { cssPrefix } from './states'
export default {
    data () {
        return {
            icon: 'M20.307 1.998c-0.839-0.462-3.15-1.601-4.658-1.913-1.566-0.325-3.897 5.79-4.638 5.817-1.202 0.043-0.146-4.175 0.996-5.902-1.782 1.19-4.948 2.788-5.689 4.625-1.432 3.551 2.654 9.942 0.474 10.309-0.68 0.114-2.562-4.407-3.051-5.787-1.381 2.64-0.341 5.111 0.801 8.198v0.192c-0.044 0.167-0.082 0.327-0.121 0.489h0.121v4.48c0 0.825 0.668 1.493 1.493 1.493 0.825 0 1.493-0.668 1.493-1.493v-4.527c2.787-0.314 4.098 0.6 6.007-3.020-1.165 0.482-3.491-0.987-3.009-1.68 0.97-1.396 4.935 0.079 7.462-4.211-4 1.066-4.473-0.462-4.511-1.019-0.080-1.154 3.999-0.542 5.858-2.146 1.078-0.93 2.37-3.133 0.97-3.905z'
        }
    },
    props: {
        x: Number,
        y: Number
    },
    computed: {
        cssPrefix,
        btnClass () {
            return {
                [this.cssPrefix + 'graph-btn']: true,
                [this.cssPrefix + 'graph-btn-edit']: true
            }
        },
        transform () {
            return 'translate(' + this.y + ',' + this.x + ')'
        }
    }
}
</script>
