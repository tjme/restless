Restless
========
[![MIT license](http://img.shields.io/badge/license-MIT-lightgrey.svg)](http://opensource.org/licenses/MIT)

Restless is a highly automated way to provide a RESTful back-end/server.

It enables you to create a REST API and SQL relational database, simply by declaring it (using TypeScript decorators).

It is implemented using [TypeScript](https://www.typescriptlang.org/), [TypeORM](https://typeorm.github.io) and [Koa](http://koajs.com).

# Prerequisites
- Install [Node.js](https://nodejs.org/en/)
- Install a SQL database server, e.g. [PostgreSQL](https://www.postgresql.org), [Microsoft SQLServer](https://www.microsoft.com/sql-server/sql-server-2016), Oracle, SQLite, MySQL or MariaDB
- Install a good IDE, e.g. [VS Code](https://code.visualstudio.com/)

# Example installation
1. clone repository `git clone https://github.com/tjme/restless.git <project_name>`
2. change to your project directory `cd <project_name>`
3. run `npm i` (or `yarn`)
4. edit `ormconfig.json` and change your database configuration (you can also change a database type, but don't forget to install specific database drivers)
5. run `npm start` (or `yarn run start`)
6. open `http://localhost:3000/post` and you'll see an empty array
7. use curl, Postman or other tools to send HTTP requests to test your REST API (e.g. POST to the above address, with a JSON body, such as `{"Title":"Test entry","Text":"Some sample text!"}`)

# Configure to meet your needs
You can simply add or replace the entities (the TypeScript definition files in Src/entity) with your own, and rerun the server. In addtion to providing the new APIs for your entities, the Database (changes) will also be made for you automatically (by TypeORM).

You annotate each entity for which you want a REST API with `Rest()`. For a standard interface, no other code (change) is needed.

By default, the API will support a standard set of CRUD operations (Create, Read, Update and Delete), including Read for both all instances/records, and for a single one (selected by id).

The API for the above "post" entity is /post by default, but can be specified with an optional parameter to the annotation in post.ts, for example: `Rest({prefix: "/posts"})`, or as seen for Categories in the category.ts definition file.

You can specify which API types you want for an entity using an optional parameter, for example `Rest({types: apiType.Create || apiType.FindAll})`, which will provide only a Create and Read (All) API. Alternatively, you can add multiple decorators to an entity, as below:
```
Rest({types: apiType.Create})
Rest({types: apiType.FindAll})
```

You can override the default path (instead of specifying just the prefix), for example to add a Delete API to the above, add:
```
Rest({types: apiType.Delete, path: "/post/del/:id"})
```

You can also override the default method for an API, for example to add a modified Update API to the above, add:
```
Rest({types: apiType.Update, method: "PUT"})
```

Of course, you can also mix and match all of the above, and produce multiple REST API endpoints for each entity.

# Rationale and future
By providing a simple mechanism to declaratively define a REST API, it is hoped that Restless can lower the bar to the rapid provision of a basic back-end, as well as providing a separation of responsibility (even where facilities and code need to be provided elsewhere). The vast majority of supporting facilities are provided by exploitation of powerful underpinning technologies, including TypeORM, Koa and Node, in addition to the power of a relational database, and only a very thin layer of functionality is provided by Restless itself.

This initial version is presented in the form of an example (a direct re-implementation of [typescript-koa-example](https://github.com/typeorm/typescript-koa-example)), and in many ways is simply a logical extension of the declarative approach supported by TypeORM.

As this is only an initial version, there are many potential requirements that it does not currently address (including authentication and access control). Indeed, it also lacks extensibility (especially in terms of controllers), which would currently require code changes (in the main restless.ts file). However, Restless is under active development to address these shortcomings.

Any feedback on Restless would be gratefully recieved.

Thanks,
Tim Merrison
tim@merrison.co.uk