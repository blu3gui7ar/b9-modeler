import { metadata } from '../getters'

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
        metaHandler () {
            return this.metadata.handler(this.metaname)
        },
        nodemeta () {
            return this.metaHandler.normalize(this.metadata.meta(this.metaname))
        }
    },
    vuex: {
        getters: {
            metadata
        }
    }
}
