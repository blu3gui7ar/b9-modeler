import { metadata } from '../states'

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
        config: Object,
        metaname: String
    },
    computed: {
        metadata,
        metaHandler () {
            return this.metadata.handler(this.metaname)
        },
        nodemeta () {
            return this.metaHandler.normalize(this.metadata.meta(this.metaname))
        }
    }
}
