import {Context} from "koa";
import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, getConnection} from "typeorm";
import {apiType, Rest} from "../server/restless";
import {Contact} from "./Contact";

export const enum privilegeType {
    Admin =         1 << 0,
    Writer =        1 << 1
}

@Rest()
@Rest({prefix: "/user/email", id: "email"})
// @Rest({types: apiType.Custom, path: "/user/email/:email", method: "get", middleware: FindOneByEmail})
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