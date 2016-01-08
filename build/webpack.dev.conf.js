var config = require('./webpack.base.conf')

config.devtool = 'eval-source-map'

config.entry = {
    'b9-modeler-sample': [
        './src/sample/index.js'
    ]
}

module.exports = config
