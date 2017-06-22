import {Context} from "koa";
import {getEntityManager} from "typeorm";

export const Create = (TargetName: string) =>
    async (ctx: Context) => {
        const repo = getEntityManager().getRepository(TargetName);
        const record = await repo.create(ctx.request.body);
        await repo.persist(record);
        ctx.body = record;};
    
export const FindAll = (TargetName: string) =>
    async (ctx: Context) => {
        const repo = getEntityManager().getRepository(TargetName);
        const records = await repo.find();
        ctx.body = records;};
    
export const FindOneById = (TargetName: string) =>
    async (ctx: Context) => {
        const repo = getEntityManager().getRepository(TargetName);
        const record = await repo.findOneById((ctx as any).params.id);
        if (!record) { ctx.status = 404; return; }
        ctx.body = record;};
    
export const Update = (TargetName: string) =>
    async (ctx: Context) => {
        const repo = getEntityManager().getRepository(TargetName);
        let record = await repo.preload({id:(ctx as any).params.id});
        for (var key in ctx.request.body) record[key]=ctx.request.body[key];
        ctx.body = record;
        await repo.persist(record);};
    
export const Delete = (TargetName: string) =>
    async (ctx: Context) => {
        const repo = getEntityManager().getRepository(TargetName);
        const record = await repo.findOneById((ctx as any).params.id);
        if (!record) { ctx.status = 404; return; }
        ctx.body = record;
        await repo.remove(record);};
