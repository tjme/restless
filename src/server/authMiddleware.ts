import {Context} from "koa";
import {Exception} from '../models/exception';
import {sign, verify} from "jsonwebtoken";
import {getEntityManager} from "typeorm";
import {privilegeType} from "./restless";

const SUPER_SECRET = 'change-this';
    
// export const FindOneById = (TargetName: string) =>
//     async (ctx: Context) => {
//         const repo = getEntityManager().getRepository(TargetName);
//         const record = await repo.findOneById((ctx as any).params.id);
//         if (!record) { ctx.status = 404; return; }
//         ctx.body = record;};

export const SignUp = async (ctx, next) => {
    let user = null; // UserDAO.findByEmail(ctx.request.body.email);
    if (user) {
        throw new Exception(401, 'E-mail already registered.');
    }
    // UserDAO.insertUser(ctx.request.body);
    user = null; // UserDAO.findByEmail(ctx.request.body.email);
    ctx.body = {
        token: sign(user, SUPER_SECRET),
        user: null // Serialize(user)
    }
};

export const SignIn = async (ctx, next) => {
    let user = null; // UserDAO.findByEmail(ctx.request.body.email);
    if (user && ctx.request.body.password == user.password) {
        ctx.body = {
            token: sign(user, SUPER_SECRET),
            user: null // Serialize(user)
        };
    } else {
        throw new Exception(401, 'Uknown user');
    }
};

export const SecuredRoutes = (privs: privilegeType) => {
    async (ctx, next) => {
        try {
            let token = ctx.request.headers['authorization'];
            ctx.state.user = verify(token.replace('Bearer ', ''), SUPER_SECRET);
            return next();
        } catch (err) {
            throw new Exception(401, 'Uknown user');
        }
    }
};