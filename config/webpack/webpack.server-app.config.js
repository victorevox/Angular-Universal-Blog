const { root } = require('./helpers');

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { AotPlugin } = require('@ngtools/webpack');



// console.log(`Server tsconfig is: ${root('public/src/tsconfig.app-server.json')}`);

/**
 * This is a server config which should be merged on top of common config
 */
module.exports = {
    // entry: root('public/src/main.server.ts'),
    devtool: 'inline-source-map',
    // entry: {
    //     // This is our Express server for Dynamic universal
    //     server: root("server/server.ts"),
    //     // This is an example of Static prerendering (generative)
    //     // prerender: './prerender.ts'
    // },
    // entry: root("server/server.ts"),
    entry: root("public/src/main.server.ts"),
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    externals: [
        /main\.bundle/,
        nodeExternals({
            whitelist: [/@angular/, /@ng/, '@server'],
        })
    ],
    // externals: [/node_modules/],
    output: {
        // Puts the output at the root of the dist folder
        path: root('dist/server'),
        filename: 'main.bundle.js',
        libraryTarget: 'commonjs',
    },
    plugins: [
        new webpack.NormalModuleReplacementPlugin(
            /ngx-quill-editor$/,
            root('./public/src/server-mocks/modules/ngx-quill-editor/quillEditor.module.ts')
        ),
        new webpack.NormalModuleReplacementPlugin(
            /ngx-quill-editor\/quillEditor.component/,
            root('./public/src/server-mocks/modules/ngx-quill-editor/quillEditor.component.ts')
        ),
        new webpack.NormalModuleReplacementPlugin(
            /jaspero\/ng-alerts/, 
            function (resource) {
                resource.request = root('./public/src/server-mocks/modules/@jaspero/ng-alerts/index.ts');
            }
        )
    ]
};