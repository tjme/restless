import {Context} from "koa";
import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, getEntityManager} from "typeorm";
import {apiType, privilegeType, Rest} from "../server/restless";
import {Contact} from "./Contact";
    
const FindOneByEmail = (TargetName: string) =>
    async (ctx: Context) => {
        const repo = getEntityManager().getRepository(TargetName);
        const record = await repo.findOneById((ctx as any).params.id);
        if (!record) { ctx.status = 404; return; }
        ctx.body = record;};

@Rest()
@Rest({types: apiType.Custom, path: "/user/email/:id", method: "get", middleware: FindOneByEmail})
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

    @ManyToOne(type => Contact, {cascadeInsert: true})
    contactId: number;

}