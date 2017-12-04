const path = require('path')
const cssnano = require("cssnano")
const cssnext = require("postcss-cssnext")

const pollyfils = [
  'whatwg-fetch'
]

module.exports = {
  entry: pollyfils.concat(['./src/index.js']),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-object-rest-spread']
          }
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },      
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [
                  cssnext({
                    warnForDuplicates: false
                  }),
                  cssnano({
                    discardUnused: {
                      fontFace: false
                    },
                    zindex: false,
                    reduceIdents: false
                  })
                ]
              }
            }
          }
        ]
      }      
    ]
  }
}
