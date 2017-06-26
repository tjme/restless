import {Context} from "koa";
import {Connection, getConnection, getEntityManager} from "typeorm";

export const Create = (TargetName: string) =>
    async (ctx: Context) => {
        console.log("Create called with id="+ctx.params.id+", body="+JSON.stringify(ctx.request.body));
        // const conn = await getConnection();
        // const record = await conn
        //     .getRepository(TargetName)
        //     .createQueryBuilder(TargetName)
        //     .insert()
        //     .update(ctx.request.body)
        //     .execute()
        //     .getGeneratedQuery()
        const repo = getEntityManager().getRepository(TargetName);
        const record = await repo.create(ctx.request.body);
        await repo.persist(record);
        console.log("... with record="+JSON.stringify(record))
        ctx.body = record
    };
    
export const FindAll = (TargetName: string) =>
    async (ctx: Context) => {
        console.log("FindAll called with id="+ctx.params.id+", body="+JSON.stringify(ctx.request.body));
        const conn = await getConnection();
        const records = await conn
            .getRepository(TargetName)
            .createQueryBuilder(TargetName)
            .getMany()
            // .getSql()
        console.log("... with records="+JSON.stringify(records))
        ctx.body = records
    };
    
export const FindOneById = (TargetName: string) =>
    async (ctx: Context) => {
        console.log("FindOneById called with id="+ctx.params.id+", body="+JSON.stringify(ctx.request.body));
        const conn = await getConnection();
        const record = await conn
            .getRepository(TargetName)
            .createQueryBuilder(TargetName)
            .where("id = :id", { id: (ctx as any).params.id })
            .getOne()
            // .getSql()
        console.log("... with record="+JSON.stringify(record))
        if (!record) { ctx.status = 404; return; }
        ctx.body = record
    };
    
export const Update = (TargetName: string) =>
    async (ctx: Context) => {
        console.log("Update called with id="+ctx.params.id+", body="+JSON.stringify(ctx.request.body));
        const conn = await getConnection();
        const record = await conn
            .getRepository(TargetName)
            .createQueryBuilder(TargetName)
            .from(TargetName, "")
            .where("id = :id", { id: (ctx as any).params.id })
            .update(ctx.request.body)
            .execute()
            // .getSqlWithParameters()
        // const repo = getEntityManager().getRepository(TargetName);
        // let record = await repo.preload({id:(ctx as any).params.id});
        // for (var key in ctx.request.body) record[key]=ctx.request.body[key];
        // ctx.body = record;
        // await repo.persist(record)
        console.log("... with record="+record)
    };
    
export const Delete = (TargetName: string) =>
    async (ctx: Context) => {
        const conn = await getConnection();
        const record = await conn
            .getRepository(TargetName)
            .createQueryBuilder(TargetName)
            .where("id = :id", { id: (ctx as any).params.id })
            .delete()
            .execute()
            // .getSql()
        console.log("... with record="+JSON.stringify(record))
    };
