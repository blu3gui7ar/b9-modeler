<template>
  <div id="app">
    <b9m></b9m>
  </div>
</template>

<script>
import store from './store'
const { b9m_init } = store.actions
import { Modeler as B9M } from '../main'

export default {
    components: {
        'b9m': B9M
    },
    ready () {
        const metaDesc = {
            model: {type: 'object', flatten: true, attrs: {description: 'desc', attributes: 'attributes', styles: 'styles', imgs: 'images'}},
            desc: {type: 'map', flatten: true, value: 'info'},
            attributes: {type: 'list', value: 'attribute'},
            attribute: {type: 'ref', target: 'attribute:'},
            styles: {type: 'list', flatten: false, value: 'style'},
            style: {type: 'ref', target: 'style:'},
            images: {type: 'list', flatten: false, value: 'image'},
            image: {type: 'ref', target: 'image:'}
        }

        const data = {
            model: {
                description: {
                    'title': 'Dress-Lily',
                    'category': 'Wedding Dress',
                    'color': 'Red'
                },
                attributes: [
                    'attribute:123',
                    'attribute:456',
                    'attribute:789'
                ],
                styles: [
                    'style:123',
                    'style:456',
                    'style:789'
                ],
                imgs: [
                    'image:123',
                    'image:456',
                    'image:789'
                ]
            }
        }
        b9m_init(metaDesc, data)
        this.$broadcast('fold')
    }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
