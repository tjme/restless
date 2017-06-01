import {Context} from "koa";
import * as Router from "koa-router";
import {getEntityManager} from "typeorm";

export let AppRoutes = [];

export const enum apiType {
    Create = 1 << 0,
    FindAll = 1 << 1,
    FindOneById = 1 << 2,
    Update = 1 << 3,
    Delete = 1 << 4,
    CRUD = Create | FindAll | FindOneById | Update | Delete
};

function dflt (value?: any, def?: any) {return (typeof value === "undefined") ? def : value;};

export function Rest(options?: {prefix?: string, types?: apiType, path?:string, method?: string}) {
    return function (target: Function) {
        const types = options && options.types || apiType.CRUD; // Default to CRUD
        const prefix = dflt(options && options.prefix,"/"+target.name); // Default to /entityname

        if  (types & apiType.Create) AppRoutes.push({
            path: dflt(options && options.path, prefix),
            method: options && options.method || "post",
            action: async (context: Context) => {
                const repo = getEntityManager().getRepository(target.name);
                const record = await repo.create(context.request.body);
                await repo.persist(record);
                context.body = record;}});

        if  (types & apiType.FindAll) AppRoutes.push({
            path: dflt(options && options.path, prefix),
            method: options && options.method || "get",
            action: async (context: Context) => {
                const repo = getEntityManager().getRepository(target.name);
                const records = await repo.find();
                context.body = records;}});

        if  (types & apiType.FindOneById) AppRoutes.push({
            path: dflt(options && options.path, prefix+"/:id"),
            method: options && options.method || "get",
            action: async (context: Context) => {
                const repo = getEntityManager().getRepository(target.name);
                const record = await repo.findOneById((context as any).params.id);
                if (!record) { context.status = 404; return; }
                context.body = record;}});

        if  (types & apiType.Update) AppRoutes.push({
            path: dflt(options && options.path, prefix+"/:id"),
            method: options && options.method || "put",
            action: async (context: Context) => {
                const repo = getEntityManager().getRepository(target.name);
                let record = await repo.preload({id:(context as any).params.id});
                for (var key in context.request.body) record[key]=context.request.body[key];
                context.body = record;
                await repo.persist(record);}});

        if  (types & apiType.Delete) AppRoutes.push({
            path: dflt(options && options.path, prefix+"/:id"),
            method: options && options.method || "delete",
            action: async (context: Context) => {
                const repo = getEntityManager().getRepository(target.name);
                const record = await repo.findOneById((context as any).params.id);
                if (!record) { context.status = 404; return; }
                context.body = record;
                await repo.remove(record);}});
    }
}