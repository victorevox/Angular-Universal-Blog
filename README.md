<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/1016365/10639063/138338bc-7806-11e5-8057-d34c75f3cafc.png" alt="Universal Angular" height="320"/>
</p>

#This project was based on https://github.com/angular/universal-starter.git

# Angular Universal Starter [![Universal Angular](https://img.shields.io/badge/universal-angular2-brightgreen.svg?style=flat)](https://github.com/angular/universal)
> Server-Side Rendering for Angular

A minimal Angular starter for Universal JavaScript using TypeScript and Webpack

> If you're looking for the Angular Universal repo go to [**angular/universal**](https://github.com/angular/universal)  

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


### Installation
* `npm install` or `yarn`


### First time cloning
* run `npm run init` this will run scripts located at (${workspace}/config/scripts) 

### Development (Client-side only rendering)
* run `npm run start` which will start `ng serve`

* run server
* * `npm run build:app-server`
* * `npm run build:server`
* * For keeping webpack watching server changes `npm run build:server -- --watch`

### Production (also for testing SSR/Pre-rendering locally)
**`npm run build:ssr && npm run serve:ssr`** - Compiles your application and spins up a Node Express to serve your Universal application on `http://localhost:4000`.

# License
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)
