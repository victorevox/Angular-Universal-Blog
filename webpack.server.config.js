// Work around for https://github.com/angular/angular-cli/issues/7200

const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    // This is our Express server for Dynamic universal
    server: './server.ts',
    // This is an example of Static prerendering (generative)
    // prerender: './prerender.ts'
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: { extensions: ['.ts', '.js'] },
  // Make sure we include all node_modules etc
  externals: [/(node_modules|main\..*\.js)/, /^(?!\.|\/).+/i, /(node_modules|main\..*\.css)/],
  output: {
    // Puts the output at the root of the dist folder
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  module: {
    // exprContextCritical: false,
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?mongodb(\\|\/)(.+)?/,
      path.join(__dirname, 'server'),
      {}
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?mongoose(\\|\/)(.+)?/,
      path.join(__dirname, 'server'),
      {}
    ),
    new webpack.DefinePlugin({
      window: undefined,
      document: JSON.stringify({
        createElement: function(){},
      }),
      location: JSON.stringify({
        protocol: 'https',
        host: `localhost`,
      })
    }),
    new webpack.NormalModuleReplacementPlugin(
      /quill.js/,
      path.resolve(__dirname, 'src/server-mocks/empty.js')
      // or if you need to make some type of specific mock (copy/pasting) and editing
      // path.resolve(__dirname, 'src/server-mocks/primeng.js')
    ),
  ]
}
