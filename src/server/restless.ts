import {Context} from "koa";
import * as Router from "koa-router";
import {SignIn, SignUp, SecuredRoutes} from "./authMiddleware";
import {Create, FindAll, FindOneById, Update, Delete} from "./entityMiddleware";

export const router = new Router();

export const enum apiType {
    Create =         1 << 0,
    FindAll =        1 << 1,
    FindOneById =    1 << 2,
    Update =         1 << 3,
    Delete =         1 << 4,
    Custom =         1 << 5,
    CRUD = Create | FindAll | FindOneById | Update | Delete
};

export const enum privilegeType {
    Admin =         1 << 0,
    Agency =        1 << 1,
    Broker =        1 << 2,
    Claims =        1 << 3,
    Underwriter =   1 << 4
}

// router.post("/SignUp", SignUp());
// router.post("/SignIn", SignIn());

export function Rest(options?: {prefix?: string, types?: apiType, path?:string, method?: string, privileges?: privilegeType, middleware?: (TargetName: string) => (ctx: Context) => Promise<void>}) {

    function dflt (value?: any, def?: any) {return (typeof value === "undefined") ? def : value;};

    function predflt (prefix: string, suffix: string="") {return options && options.path || prefix+suffix};

    return function (target: Function) {
        const types = options && options.types || apiType.CRUD; // Default to CRUD
        const prefix = dflt(options && options.prefix,"/"+target.name); // Default to /entityname

        // if (typeof options.privileges === "undefined")
        //     router.post(predflt(prefix), SecuredRoutes(options.privileges));

        if (types & apiType.Create)
            router[options && options.method || "post"](predflt(prefix), Create(target.name));

        if (types & apiType.FindAll)
            router[options && options.method || "get"](predflt(prefix), FindAll(target.name));

        if (types & apiType.FindOneById)
            router[options && options.method || "get"](predflt(prefix, "/:id"), FindOneById(target.name));

        if (types & apiType.Update)
            router[options && options.method || "put"](predflt(prefix, "/:id"), Update(target.name));

        if (types & apiType.Delete)
            router[options && options.method || "delete"](predflt(prefix, "/:id"), Delete(target.name));

        if (types & apiType.Custom)
            router[options && options.method || "get"](predflt(prefix), options.middleware(target.name));
    }
}