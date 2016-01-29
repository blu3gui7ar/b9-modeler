import { metadata } from './states'

export default {
    computed: {
        metadata
    },
    methods: {
        component (metaname) {
            return this.metadata.component(metaname)
        },
        onUpdate (key, modify) {
            console.log('default update')
        },
        onSet (key, value) {
            console.log('default set')
        }
    },
    events: {
        update: 'onUpdate',
        set: 'onSet'
    }
}
