// Work around for https://github.com/angular/angular-cli/issues/7200

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const root = path.resolve(__dirname, "../../");

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    // This is our Express server for Dynamic universal
    server: path.join(root, "server/server.ts"),
    // This is an example of Static prerendering (generative)
    // prerender: './prerender.ts'
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      "@app": path.join(root, 'public/src/app'),
      "@shared": path.join(root, 'shared'),
      "@server": path.join(root, "server"),
      "root": path.join(root),
    },
  },
  // Make sure we include all node_modules etc
  // externals: [/(node_modules|main\..*\.js)/, /^(?!\.|\/).+/i, /(node_modules|main\..*\.css)/],
  externals: [
    // function (context, request, callback) {
    //   // console.log(request);
      
    //   if (/node_modules/.test(context)) {
    //     console.log(context);
    //     return callback(null, 'commonjs ' + request);
    //   }
    //   callback();
    // }
    /main\.bundle/,
    nodeExternals({
      whitelist: ['@server'],
    })
  ],
  // externals: [/node_modules/],
  output: {
    // Puts the output at the root of the dist folder
    path: path.join(root, 'dist/server'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  module: {
    // exprContextCritical: false,
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(root, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(root, 'src'),
      {}
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?mongodb(\\|\/)(.+)?/,
      path.join(root, 'server'),
      {}
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?mongoose(\\|\/)(.+)?/,
      path.join(root, 'server'),
      {}
    ),
    new webpack.DefinePlugin({
      window: undefined,
      document: JSON.stringify({
        createElement: function () { },
      }),
      location: JSON.stringify({
        protocol: 'https',
        host: `localhost`,
      })
    })
  ]
}
