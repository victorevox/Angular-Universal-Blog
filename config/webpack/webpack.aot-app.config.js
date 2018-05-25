const { root } = require('./helpers');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { AotPlugin } = require('@ngtools/webpack');

const tsconfigs = {
  client: root('./public/src/tsconfig.app.json'),
  server: root('./public/src/tsconfig.app-server.json')
};

/**
 * Generates a AotPlugin for @ngtools/webpack
 *
 * @param {string} platform Should either be client or server
 * @param {boolean} aot Enables/Disables AoT Compilation
 * @returns {AotPlugin} Configuration of AotPlugin
 */
function getAotPlugin(platform, aot) {
  let options = {
    tsConfigPath: tsconfigs[platform],
    skipCodeGeneration: !aot,
    // sourceMap: false,
  };
  if(platform === "server") {
    options.platform = 1;
    // options.mainPath = "app/app.server.module.ts";
    // options.entryModule = root('./public/src/app/app.server.module.ts#AppServerModule');
  }
  return new AngularCompilerPlugin(options);
}

module.exports = {
  getAotPlugin: getAotPlugin
};