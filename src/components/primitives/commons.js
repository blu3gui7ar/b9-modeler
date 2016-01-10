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
        metaname: String
    },
    computed: {
        metadata,
        nodemeta () {
            return this.metadata.meta(this.metaname)
        }
    }
}
