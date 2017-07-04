import {Context} from "koa";
import {getConnection} from "typeorm";
import {Exception} from "../models/exception";

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
            .where((typeof ctx.query["filter"]==="undefined") ? "" : ctx.query["filter"])
            .getMany()
        ctx.body = records
    };
    
export const FindOne = (target: Function, id: string="id") =>
    async (ctx: Context) => {
        const conn = await getConnection();
        const record = await conn
            .getRepository(target.name)
            .createQueryBuilder(target.name)
            .where(id+" = :"+id)
            .setParameter(id, ctx.params[id])
            .getOne()
        if (!record) {throw new Exception(404, "No such "+id)}
        ctx.body = record
    };
    
export const Update = (target: Function, id: string="id") =>
    async (ctx: Context) => {
        const conn = await getConnection();
        const record = await conn
            .getRepository(target.name)
            .createQueryBuilder(target.name)
            .update()
            .set(ctx.request.body)
            .where(id+" = :"+id)
            .setParameter(id, ctx.params[id])
            .execute()
    };
    
export const Delete = (target: Function, id: string="id") =>
    async (ctx: Context) => {
        const conn = await getConnection();
        const record = await conn
            .getRepository(target.name)
            .createQueryBuilder(target.name)
            .where(id+" = :"+id)
            .setParameter(id, ctx.params[id])
            .delete()
            .execute()
    };
