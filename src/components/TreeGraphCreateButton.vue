<template>
    <svg:g transform="translate({{y}},{{x}})" class="function-btn add" :click="onClick">
        <svg:title>{{name}}</svg:title>
        <svg:circle r=12 cx=7 cy=12></svg:circle>
        <svg:text x=7 y=17 class="function-text" text-anchor="middle"
            font-weight="bold" font-family="Cursive" font-size=16
            :text="name[0] | uppercase" >
        </svg:text>
    </svg:g>
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
.function-btn.remove{
  fill: #E97979;
}
.function-btn.edit{
  fill: #79AFE9;
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
