import {Context} from "koa";
import * as Router from "koa-router";
import {getEntityManager} from "typeorm";

export const router = new Router();

export const enum apiType {
    Create =         1 << 0,
    FindAll =        1 << 1,
    FindOneById =    1 << 2,
    Update =         1 << 3,
    Delete =         1 << 4,
    CRUD = Create | FindAll | FindOneById | Update | Delete
};

function dflt (value?: any, def?: any) {return (typeof value === "undefined") ? def : value;};

export function Rest(options?: {prefix?: string, types?: apiType, path?:string, method?: string}) {

    function predflt (prefix: string, suffix: string="") {return options && options.path || prefix+suffix};

    return function (target: Function) {
        const types = options && options.types || apiType.CRUD; // Default to CRUD
        const prefix = dflt(options && options.prefix,"/"+target.name); // Default to /entityname

        if  (types & apiType.Create) router[options && options.method || "post"](
            predflt(prefix),
            async (context: Context) => {
                const repo = getEntityManager().getRepository(target.name);
                const record = await repo.create(context.request.body);
                await repo.persist(record);
                context.body = record;});

        if  (types & apiType.FindAll) router[options && options.method || "get"](
            predflt(prefix),
            async (context: Context) => {
                const repo = getEntityManager().getRepository(target.name);
                const records = await repo.find();
                context.body = records;});

        if  (types & apiType.FindOneById) router[options && options.method || "get"](
            predflt(prefix, "/:id"),
            async (context: Context) => {
                const repo = getEntityManager().getRepository(target.name);
                const record = await repo.findOneById((context as any).params.id);
                if (!record) { context.status = 404; return; }
                context.body = record;});

        if  (types & apiType.Update) router[options && options.method || "put"](
            predflt(prefix, "/:id"),
            async (context: Context) => {
                const repo = getEntityManager().getRepository(target.name);
                let record = await repo.preload({id:(context as any).params.id});
                for (var key in context.request.body) record[key]=context.request.body[key];
                context.body = record;
                await repo.persist(record);});

        if  (types & apiType.Delete) router[options && options.method || "delete"](
            predflt(prefix, "/:id"),
            async (context: Context) => {
                const repo = getEntityManager().getRepository(target.name);
                const record = await repo.findOneById((context as any).params.id);
                if (!record) { context.status = 404; return; }
                context.body = record;
                await repo.remove(record);});
    }
}