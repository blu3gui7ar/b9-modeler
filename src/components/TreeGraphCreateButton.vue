<template>
    <g :transform="transform" :class="{'function-btn-disabled': !valid}" class="function-btn add" :style='style'>
        <title>{{name}}</title>
        <circle r=12 cx=7 cy=12></circle>
        <text x=7 y=17 class="function-text" text-anchor="middle"
                font-weight="bold" font-family="Cursive" font-size=16>
            {{name[0] | uppercase}}
        </text>
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
.function-btn.add{
  fill: #57D37E;
}
.function-btn-disabled * {
    opacity: 0.3;
}
g:hover > .node-active > .function-btn{
  opacity: 1;
}
.function-text{
  cursor: pointer;
}
</style>

<script>
export default {
    data () {
        return {
        }
    },
    props: {
        name: String,
        x: Number,
        y: Number,
        show: Boolean,
        valid: Boolean,
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
    },
    methods: {
        onClick () {
            /*
            var name = d3.select(this).select("title").text();
            if(d.buttons[name] == false){
                return;
            }
            var childList;
            if(d.children){
                childList = d.children;
            }
            else if(d._children){
                childList = d.children = d._children;
                d._children = null;
            }
            else{
                childList = [];
                d.children = childList;
            }
            childList.push(
                    scope.handler.newChildModel(d,name,childList.length)
                    );

            var clist = [];
            for(var button in d.buttons){
                if(!d.buttons[button] || name == button){
                    clist.push(button);
                }
            }
            d.buttons = scope.handler.buttons(d.name, clist);
            update(d);
            scope.root = root;
            */
        }
    }
}
</script>
