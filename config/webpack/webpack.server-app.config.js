const { root } = require('./helpers');

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

/**
 * This is a server config which should be merged on top of common config
 */
module.exports = {
    // entry: root('public/src/main.server.ts'),
    
    // plugins: [
    //     new webpack.NormalModuleReplacementPlugin(
    //         /ngx-quill-editor$/,
    //         root('./public/src/server-mocks/modules/ngx-quill-editor/quillEditor.module.ts')
    //     ),
    //     new webpack.NormalModuleReplacementPlugin(
    //         /ngx-quill-editor\/quillEditor.component/,
    //         root('./public/src/server-mocks/modules/ngx-quill-editor/quillEditor.component.ts')
    //     )
    // ],
    devtool: 'inline-source-map',
    entry: {
        // This is our Express server for Dynamic universal
        server: root("server/server.ts"),
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
            "@app": root('public/src/app'),
            "@shared": root('shared'),
            "@server": root("server"),
            "root": root('')
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
            whitelist: [/@angular/, /@ng/, '@server'],
        })
    ],
    // externals: [/node_modules/],
    output: {
        // Puts the output at the root of the dist folder
        path: root('dist/server'),
        filename: '[name].js',
        libraryTarget: 'commonjs',
    },
    // module: {
    //     // exprContextCritical: false,
    //     rules: [
    //         {
    //             test: /\.ts$/,
    //             loader: 'ts-loader',
    //             options: {
    //                 configFile: root("server/tsconfig.server.json")
    //             }
    //         }
    //     ]
    // },
    // plugins: [
    //     new webpack.ContextReplacementPlugin(
    //         // fixes WARNING Critical dependency: the request of a dependency is an expression
    //         /(.+)?angular(\\|\/)core(.+)?/,
    //         root('src'), // location of your src
    //         {} // a map of your routes
    //     ),
    //     new webpack.ContextReplacementPlugin(
    //         // fixes WARNING Critical dependency: the request of a dependency is an expression
    //         /(.+)?express(\\|\/)(.+)?/,
    //         root('src'),
    //         {}
    //     ),
    //     new webpack.ContextReplacementPlugin(
    //         // fixes WARNING Critical dependency: the request of a dependency is an expression
    //         /(.+)?mongodb(\\|\/)(.+)?/,
    //         root('server'),
    //         {}
    //     ),
    //     new webpack.ContextReplacementPlugin(
    //         // fixes WARNING Critical dependency: the request of a dependency is an expression
    //         /(.+)?mongoose(\\|\/)(.+)?/,
    //         root('server'),
    //         {}
    //     ),
    //     new webpack.DefinePlugin({
    //         window: undefined,
    //         document: JSON.stringify({
    //             createElement: function () { },
    //         }),
    //         location: JSON.stringify({
    //             protocol: 'https',
    //             host: `localhost`,
    //         })
    //     }),
    //     new webpack.NormalModuleReplacementPlugin(
    //         /quill.js/,
    //         root('src/server-mocks/empty.js')
    //         // or if you need to make some type of specific mock (copy/pasting) and editing
    //         // path.resolve(root, 'src/server-mocks/primeng.js')
    //     ),
    // ]
};