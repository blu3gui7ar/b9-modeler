import _ from 'lodash'
import DefaultHandler from '../DefaultHandler'

export default class CheckboxHandler extends DefaultHandler {
    defaultData () {
        return []
    }
    normalize (metaItem) {
        const choices = metaItem.choices
        if (_.isArray(choices)) {
            return {...metaItem, choices: _.zipObject(choices, choices)}
        } else {
            return metaItem
        }
    }
}
