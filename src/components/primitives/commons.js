import store from '../../store'

export default {
    props: {
        nodename: {
            validator (value) {
                return typeof value === 'number' || typeof value === 'string'
            }
        },
        noderef: {
            validator (value) {
                return typeof value === 'number' || typeof value === 'string'
            }
        },
        metaname: String
    },
    computed: {
        nodemeta () {
            return store.state.metadata.meta(this.metaname)
        }
    }
}
