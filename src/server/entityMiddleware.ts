import {Context} from "koa";
import {getConnection} from "typeorm";

export const Create = (target: Function) =>
    async (ctx: Context) => {
        const conn = await getConnection();
        const record = await conn
            .createQueryBuilder()
            .insert()
            .into(target.name)
            .values(ctx.request.body)
            .execute()
    };
    
export const FindAll = (target: Function) =>
    async (ctx: Context) => {
        const conn = await getConnection();
        const records = await conn
            .getRepository(target.name)
            .createQueryBuilder(target.name)
            .getMany()
        ctx.body = records
    };
    
export const FindOneById = (target: Function) =>
    async (ctx: Context) => {
        const conn = await getConnection();
        const record = await conn
            .getRepository(target.name)
            .createQueryBuilder(target.name)
            .where("id = :id", { id: (ctx as any).params.id })
            .getOne()
        if (!record) { ctx.status = 404; return; }
        ctx.body = record
    };
    
export const Update = (target: Function) =>
    async (ctx: Context) => {
        const conn = await getConnection();
        const record = await conn
            .getRepository(target.name)
            .createQueryBuilder(target.name)
            .update()
            .set(ctx.request.body)
            .where("id = :id", { id: (ctx as any).params.id })
            .execute()
    };
    
export const Delete = (target: Function) =>
    async (ctx: Context) => {
        const conn = await getConnection();
        const record = await conn
            .getRepository(target.name)
            .createQueryBuilder(target.name)
            .where("id = :id", { id: (ctx as any).params.id })
            .delete()
            .execute()
    };
