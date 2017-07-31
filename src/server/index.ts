import "reflect-metadata";
import {createConnection} from "typeorm";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as serve from "koa-static";
// import * as passport from 'koa-passport';
// import * as session from 'koa-session';

import exceptionHandler from "./exceptionMiddleware";
import {router} from "./restless";

createConnection().then(async connection => {

    // create koa app
    const app = new Koa();
    app.use(exceptionHandler);
    app.use(serve("./src/server/static"));
    app.use(bodyParser());
    // app.use(passport.initialize());
    // app.use(passport.session());
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(process.env.npm_package_config_port);
    console.log("Restless application is up and running on port "+process.env.npm_package_config_port);

}).catch(error => console.log("TypeORM connection error: ", error));