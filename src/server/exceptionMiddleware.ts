import {Exception} from "../models/exception";

export default async (ctx, next) => {
    try {
        return next();
    } catch (err) {
        if (err instanceof Exception) {
            // it transform the exception to an object literal
            ctx.body = err.toObject();
            ctx.status = err.statusCode;
            console.log("ExceptionHandler status code="+ctx.statusCode);
        } else {
            // unknow error
            ctx.body = { message: 'Unexpected error.' };
            ctx.status = 500;
        }
    }
};