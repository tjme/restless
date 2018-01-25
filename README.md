# Restless

<sup>[![Version Badge](http://versionbadg.es/tjme/restless.svg)](https://github.com/tjme/restless)</sup>
<!--[![MIT license](http://img.shields.io/badge/license-MIT-lightgrey.svg)](http://opensource.org/licenses/MIT)-->

Restless automates the provision of a RESTful back-end/server, and relational database.

It enables you to create a REST API and SQL relational database, simply by declaring it (using TypeScript decorators).

It is implemented using [TypeScript](https://www.typescriptlang.org/), [TypeORM](https://typeorm.github.io) and [Koa](http://koajs.com).

## Prerequisites

- Install [Node.js](https://nodejs.org/en/)
- Install a SQL database server, e.g. [PostgreSQL](https://www.postgresql.org), [Microsoft SQLServer](https://www.microsoft.com/sql-server/sql-server-2016), Oracle, SQLite, MySQL or MariaDB
- Create an (empty) database
- Optionally install a good IDE with TypeScript, e.g. [VS Code](https://code.visualstudio.com/)

## Example installation

1. clone repository `git clone https://github.com/tjme/restless.git <project_name>`
2. change to your project directory `cd <project_name>`
3. run `npm i` (or `yarn`)
4. edit `ormconfig.json` and change your database configuration (you can also change a database type, but don't forget to install specific database drivers)
5. run `npm start` (or `yarn run start`)
6. open `http://localhost:3000/user` and you'll see an empty array
7. use curl, Postman or other tools to send HTTP requests to test your REST API (e.g. PUT to the above address, with a JSON body, such as `{"email":"user@test.com"}`)

## Configuration options

You can simply add or replace the entities (the TypeScript definition files in /models) with your own, and rerun the server. In addtion to providing the new APIs for your entities, the Database (changes) can also be made for you automatically (by TypeORM).

You annotate each entity for which you want a REST API with `@Rest()`. For a standard interface, no other code (change) is needed.

By default, the API will support a standard set of CRUD operations (Create, Read, Update and Delete), including Read for both all instances/records, and for a single one (selected by id).

The API for the above "user" entity is /user by default, but can be specified with an optional parameter to the annotation in user.ts, for example: `@Rest({prefix: "/users"})`.

You can specify which API types you want for an entity using an optional parameter, for example `@Rest({types: apiType.Create || apiType.FindAll})`, which will provide only a Create and Read (All) API. Alternatively, you can add multiple decorators to an entity, as below:

```typescript
@Rest({types: apiType.Create})
@Rest({types: apiType.FindAll})
```

You can override the default path (instead of specifying just the prefix), for example to add a Delete API to the above, add:

```typescript
@Rest({types: apiType.Delete, path: "/user/del/:id"})
```

You can also override the default method for an API, for example to add a modified Update API to the above, add:

```typescript
@Rest({types: apiType.Update, method: "POST"})
```

Of course, you can also mix and match all of the above, and produce multiple REST API endpoints for each entity. For example, you can create a secondary set of API endpoints, but selecting by e-mail address rather than user id:

```typescript
@Rest({prefix: "/user/email", id: "email"})
```

## Rationale and future

By providing a simple mechanism to declaratively define a REST API, it is hoped that Restless can lower the bar to the rapid provision of a basic back-end, as well as providing a separation of responsibility (between configuring the API for each entity, avoiding some or all coding by reusing standard middleware). The vast majority of supporting facilities are provided by exploitation of powerful underpinning technologies, including TypeORM, Koa and Node, in addition to the power of a relational database, and only a very thin layer of functionality is provided by Restless itself.

The initial version was little more than a direct re-implementation of [typescript-koa-example](https://github.com/typeorm/typescript-koa-example), but for relational databases. It now also borrows from [Building and Securing Koa and Angular2 with JWT](https://auth0.com/blog/building-and-securing-a-koa-and-angular2-app-with-jwt). In many ways, it is a logical extension of the declarative approach supported by TypeORM.

As this is only an initial version, there are many potential requirements not currently addressed (including authentication and access control).

Any feedback on Restless would be gratefully recieved.

Thanks,
tim@merrison.co.uk