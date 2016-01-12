import _ from 'lodash'
import * as rawActions from '../store/actions'

const callables = _.mapValues(rawActions, (func, name) => function (config, ...args) {
    return config.action(name)(...args)
})

export default callables
