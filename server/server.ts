
import * as express from 'express';
import * as methodOverride from "method-override";
import { join, resolve } from 'path';
import { readFileSync, existsSync } from 'fs';
import { json, urlencoded } from "body-parser";
import { config as dotEnvConfig } from "dotenv";

//All serverside Related stuff
// import 'zone.js/dist/zone-node';
// import 'reflect-metadata';
// import { renderModuleFactory } from '@angular/platform-server';
// import { enableProdMode } from '@angular/core';
// // Express Engine
// import { ngExpressEngine } from '@nguniversal/express-engine';
// // Import module map for lazy loading
// import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
// // Faster server renders w/ Prod mode (dev mode never needed)
// enableProdMode();

import { api_routes } from "@server/routes/api.routes";
import { ErrorMiddleware } from "@server/middlewares/express/error.middleware";
import { connectDb } from '@server/config/db';
import { PassportConfig } from "@server/config/passport";

const DIST_FOLDER = join(process.cwd(), 'dist');

//Read env variables
if (existsSync(join(__dirname, '/../.env'))) {
  let envPath = join(__dirname, '/../.env');
  dotEnvConfig({ path: envPath });
} else if (existsSync(join(__dirname, '/../.env.example'))) {
  let envPath = join(__dirname, '/../.env.example');
  dotEnvConfig({ path: envPath });
  console.log(join(__dirname, '/../.env.example'));
  console.log("Loaded example ENV");

} else {
  console.log("No .env file found");
}
// dotEnvConfig({ path:  })

// Express server
const app = express();

const PORT = process.env.PORT || 4000;

// Our index.html we'll use as our template
if(existsSync(resolve(__dirname, 'browser/index.html'))) {
  const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();
}

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
// const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');


app.use(json()); // parse application/json
app.use(json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override'));
// app.use(filter());

//Connect to main DB
connectDb();

//Config Passport
PassportConfig.config(app);

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
// app.engine('html', ngExpressEngine({
//   bootstrap: AppServerModuleNgFactory,
//   providers: [
//     provideModuleMap(LAZY_MODULE_MAP)
//   ]
// }));

//app.set('view engine', 'html');
//app.set('views', join(DIST_FOLDER, 'browser'));

/* - Example Express Rest API endpoints -
  app.get('/api/**', (req, res) => { });
*/

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));
// Server static files from /../statics
app.get('*.*', express.static(join(DIST_FOLDER, '/../statics'), {
  maxAge: '1y'
}));

//register APIs and WEB routes
api_routes(app);

// ALl regular routes use the Universal engine
app.get('*', (req, res) => {
  // res.render('index', { req });
  res.sendFile(join(DIST_FOLDER, 'browser/index.html'))
});

// add Error middleware, all errors will be catched by this
app.use(ErrorMiddleware.init);

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
