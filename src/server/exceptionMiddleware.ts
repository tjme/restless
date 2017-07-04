import {Context} from "koa";
import {Exception} from "../models/exception";

export default async (ctx: Context, next: any) => {
    try {
        await next();
    } catch (err) {
        if (err instanceof Exception) {
            // it transform the exception to an object literal
            ctx.status = err.statusCode;
            ctx.body = err.toObject();
            console.log("Error="+JSON.stringify(ctx.body));
        } else {
            // unknow error
            ctx.status = 500;
            ctx.body = {message: 'Unexpected error'};
            console.log("Error status code="+err.statusCode+" reported code="+ctx.status+" object="+JSON.stringify(ctx.body));
        }
    }
};