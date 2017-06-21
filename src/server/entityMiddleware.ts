import {Context} from "koa";
import {getEntityManager} from "typeorm";

export const Create = (TargetName: string) =>
    async (context: Context) => {
        const repo = getEntityManager().getRepository(TargetName);
        const record = await repo.create(context.request.body);
        await repo.persist(record);
        context.body = record;};
    
export const FindAll = (TargetName: string) =>
    async (context: Context) => {
        const repo = getEntityManager().getRepository(TargetName);
        const records = await repo.find();
        context.body = records;};
    
export const FindOneById = (TargetName: string) =>
    async (context: Context) => {
        const repo = getEntityManager().getRepository(TargetName);
        const record = await repo.findOneById((context as any).params.id);
        if (!record) { context.status = 404; return; }
        context.body = record;};
    
export const Update = (TargetName: string) =>
    async (context: Context) => {
        const repo = getEntityManager().getRepository(TargetName);
        let record = await repo.preload({id:(context as any).params.id});
        for (var key in context.request.body) record[key]=context.request.body[key];
        context.body = record;
        await repo.persist(record);};
    
export const Delete = (TargetName: string) =>
    async (context: Context) => {
        const repo = getEntityManager().getRepository(TargetName);
        const record = await repo.findOneById((context as any).params.id);
        if (!record) { context.status = 404; return; }
        context.body = record;
        await repo.remove(record);};
