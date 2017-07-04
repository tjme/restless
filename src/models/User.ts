import {Context} from "koa";
import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, getConnection} from "typeorm";
import {apiType, privilegeType, Rest} from "../server/restless";
import {Contact} from "./Contact";
import {Exception} from "../models/exception";

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