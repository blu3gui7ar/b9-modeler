import DefaultHandler from '../DefaultHandler'

export default class RefHandler extends DefaultHandler {
    hasNode () {
        // return nodemeta.flatten !== undefined && !nodemeta.flatten
        return !this.nodemeta.flatten
    }
}
