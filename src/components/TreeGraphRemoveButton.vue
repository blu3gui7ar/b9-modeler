<template>
    <g :transform="transform" class="function-btn remove" :style='style'>
        <path :d="icon"></path>
        <circle opacity=1e-6 r=12 cx=11 cy=12></circle>
    </g>
</template>

<style scoped>
.function-btn{
  opacity: 0;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  transition: all 0.5s ease;
  display: none;
}
.function-btn.remove{
  fill: #E97979;
}
g:hover > .node-active > .function-btn{
  opacity: 1;
}
</style>

<script>
export default {
    data () {
        return {
            icon: 'M3.514 20.485c-4.686-4.686-4.686-12.284 0-16.97 4.688-4.686 12.284-4.686 16.972 0 4.686 4.686 4.686 12.284 0 16.97-4.688 4.687-12.284 4.687-16.972 0zM18.365 5.636c-3.516-3.515-9.214-3.515-12.728 0-3.516 3.515-3.516 9.213 0 12.728 3.514 3.515 9.213 3.515 12.728 0 3.514-3.515 3.514-9.213 0-12.728zM8.818 17.303l-2.121-2.122 3.182-3.182-3.182-3.182 2.121-2.122 3.182 3.182 3.182-3.182 2.121 2.122-3.182 3.182 3.182 3.182-2.121 2.122-3.182-3.182-3.182 3.182z'
        }
    },
    props: {
        x: Number,
        y: Number,
        show: Boolean,
        node: Object
    },
    computed: {
        style () {
            return {
                display: this.show ? 'inline-block' : 'none'
            }
        },
        transform () {
            return 'translate(' + this.y + ',' + this.x + ')'
        }
    }
}
</script>
