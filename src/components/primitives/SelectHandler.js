import _ from 'lodash'
import DefaultHandler from '../DefaultHandler'

export default class SelectHandler extends DefaultHandler {
    normalize (metaItem) {
        const options = metaItem.options
        if (_.isArray(options)) {
            return {...metaItem, options: _.zipObject(options, options)}
        } else {
            return metaItem
        }
    }
}
