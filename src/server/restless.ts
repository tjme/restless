import {Context} from "koa";
import * as Router from "koa-router";
import {SignIn, SignUp, SecuredRoutes} from "./authMiddleware";
import {Create, FindAll, FindOne, Update, Delete} from "./entityMiddleware";
import {privilegeType} from "../models/User";

export const router = new Router();

export const enum apiType {
    Create =        1 << 0,
    FindAll =       1 << 1,
    FindOne =       1 << 2,
    Update =        1 << 3,
    Delete =        1 << 4,
    Custom =        1 << 5,
    CRUD = Create | FindAll | FindOne | Update | Delete
};

// router.post("/SignUp", SignUp());
// router.post("/SignIn", SignIn());

export function Rest(options?: {prefix?: string, types?: apiType, path?:string, method?: string, privileges?: privilegeType, id?: string, middleware?: (target: Function) => (ctx: Context) => Promise<void>}) {

    function dflt (value?: any, def?: any) {return (typeof value === "undefined") ? def : value;};

    function predflt (prefix: string, suffix: string="") {return options && options.path || prefix+suffix};

    return function (target: Function) {
        const id = options && options.id || "id";
        const types = options && options.types || apiType.CRUD; // Default to CRUD
        const prefix = dflt(options && options.prefix,"/"+target.name); // Default to /entityname

        // if (typeof options.privileges === "undefined")
        //     router.post(predflt(prefix), SecuredRoutes(options.privileges));

        if (types & apiType.Create)
            router[options && options.method || "post"](predflt(prefix), Create(target));

        if (types & apiType.FindAll)
            router[options && options.method || "get"](predflt(prefix), FindAll(target));

        if (types & apiType.FindOne)
            router[options && options.method || "get"](predflt(prefix, "/:"+id), FindOne(target, id));

        if (types & apiType.Update)
            router[options && options.method || "put"](predflt(prefix, "/:"+id), Update(target, id));

        if (types & apiType.Delete)
            router[options && options.method || "delete"](predflt(prefix, "/:"+id), Delete(target, id));

        if (types & apiType.Custom)
            router[options && options.method || "get"](predflt(prefix), options.middleware(target));
    }
}