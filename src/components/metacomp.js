import store from '../store'

export default {
    computed: {
        metadata () {
            return store.state.metadata
        }
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
    ready () {
        this.$on('update', this.onUpdate)
        this.$on('set', this.onSet)
    }
}
