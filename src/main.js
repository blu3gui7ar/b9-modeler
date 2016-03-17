import * as store from './store'
import * as actions from './components/actions'
import Modeler from './components/Modeler'
import TreeGraph from './components/TreeGraph'
import PlainEditor from './components/PlainEditor'
import DefaultHandler from './components/DefaultHandler'
import registry from './components/registry'
import metacomp from './components/metacomp'
import commons from './components/primitives/commons'
import VuexGetters from './vuex-getters-plugin'

export {
    VuexGetters,
    Modeler,
    TreeGraph,
    PlainEditor,
    registry,
    DefaultHandler,
    metacomp,
    commons,
    store,
    actions
}
