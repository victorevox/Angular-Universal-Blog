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
    sourceMap: true,
  };
  if(platform === "server") {
    console.log("Serverrrrr");
    options.platform = 1;
    options.compilerOptions = {}
    console.log(options);
    // options.mainPath = "main.server.ts";
    options.mainPath = "app/app.server.module.ts";
    
  }
  return new AngularCompilerPlugin(options);
}

module.exports = {
  getAotPlugin: getAotPlugin
};