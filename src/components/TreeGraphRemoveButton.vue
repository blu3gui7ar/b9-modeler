<template>
    <g :transform="transform" :class="btnClass">
        <path :d="icon"></path>
        <circle opacity=1e-6 r=12 cx=11 cy=12></circle>
    </g>
</template>

<script>
import config from './config'
import { cssPrefix } from './states'
export default {
    mixins: [config],
    data () {
        return {
            icon: 'M3.514 20.485c-4.686-4.686-4.686-12.284 0-16.97 4.688-4.686 12.284-4.686 16.972 0 4.686 4.686 4.686 12.284 0 16.97-4.688 4.687-12.284 4.687-16.972 0zM18.365 5.636c-3.516-3.515-9.214-3.515-12.728 0-3.516 3.515-3.516 9.213 0 12.728 3.514 3.515 9.213 3.515 12.728 0 3.514-3.515 3.514-9.213 0-12.728zM8.818 17.303l-2.121-2.122 3.182-3.182-3.182-3.182 2.121-2.122 3.182 3.182 3.182-3.182 2.121 2.122-3.182 3.182 3.182 3.182-2.121 2.122-3.182-3.182-3.182 3.182z'
        }
    },
    props: {
        x: Number,
        y: Number,
        valid: Boolean
    },
    computed: {
        cssPrefix,
        btnClass () {
            return {
                [this.cssPrefix + 'graph-btn']: true,
                [this.cssPrefix + 'graph-btn-remove']: true,
                [this.cssPrefix + 'graph-btn-disabled']: !this.valid
            }
        },
        transform () {
            return 'translate(' + this.y + ',' + this.x + ')'
        }
    }
}
</script>
