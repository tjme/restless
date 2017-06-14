import "reflect-metadata";
import {createConnection} from "typeorm";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";

import {router} from "./restless";

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
createConnection().then(async connection => {

    // create koa app
    const app = new Koa();

    // run app
    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(3000);

    console.log("Restless application is up and running on port 3000");

}).catch(error => console.log("TypeORM connection error: ", error));