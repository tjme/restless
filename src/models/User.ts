import {Context} from "koa";
import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, getConnection} from "typeorm";
import {apiType, privilegeType, Rest} from "../server/restless";
import {Contact} from "./Contact";

const FindOneByEmail = (target: Function) =>
    async (ctx: Context) => {
        const conn = await getConnection();
        const record = await conn
            .getRepository(target.name)
            .createQueryBuilder(target.name)
            .where("email = :email")
            .setParameter("email", ctx.params.email)
            .getOne();
        if (!record) { ctx.status = 404; return; }
        ctx.body = record;};

@Rest()
@Rest({types: apiType.Custom, path: "/user/email/:email", method: "get", middleware: FindOneByEmail})
@Entity()
export class User {

    @PrimaryColumn("int", {generated: true})
    id: number;

    @Column()
    email: string;

    @Column({nullable: true})
    passwordHash: string;

    @CreateDateColumn({nullable: true})
    created: Date;

    @UpdateDateColumn({nullable: true})
    updated: Date;

    @Column("int", {nullable: true})
    privileges: number;

    @ManyToOne(type => Contact, {cascadeAll: true})
    contact: Contact;

}