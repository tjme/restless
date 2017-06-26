import {Context} from "koa";
import {Connection, getConnection} from "typeorm";

export const Create = (TargetName: string) =>
    async (ctx: Context) => {
        const conn = await getConnection();
        const record = await conn
            .getRepository(TargetName)
            .createQueryBuilder(TargetName)
            .insert()
            .update(ctx.request.body)
            .execute();
        ctx.body = record;};
    
export const FindAll = (TargetName: string) =>
    async (ctx: Context) => {
        const conn = await getConnection();
        const records = await conn
            .getRepository(TargetName)
            .createQueryBuilder(TargetName)
            .getMany();
        ctx.body = records;};
    
export const FindOneById = (TargetName: string) =>
    async (ctx: Context) => {
        const conn = await getConnection();
        const record = await conn
            .getRepository(TargetName)
            .createQueryBuilder(TargetName)
            .where("id = id", { id: (ctx as any).params.id })
            .getOne();
        if (!record) { ctx.status = 404; return; }
        ctx.body = record;};
    
export const Update = (TargetName: string) =>
    async (ctx: Context) => {
        const conn = await getConnection();
        const record = await conn
            .getRepository(TargetName)
            .createQueryBuilder(TargetName)
            .update(ctx.request.body)
            .where("id = id", { id: (ctx as any).params.id })
            .execute();};
    
export const Delete = (TargetName: string) =>
    async (ctx: Context) => {
        const conn = await getConnection();
        const record = await conn
            .getRepository(TargetName)
            .createQueryBuilder(TargetName)
            .delete()
            .where("id = id", { id: (ctx as any).params.id })
            .execute();};
