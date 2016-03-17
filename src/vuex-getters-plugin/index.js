import override from './override'

function install (_Vue) {
    let Vue = _Vue
    override(Vue)
}

export default {
    install
}
