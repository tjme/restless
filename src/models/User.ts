import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import {apiType, Rest} from "../server/restless";
import {Contact} from "./Contact";

export const enum privilegeType {
    Admin =         1 << 0,
    Agency =        1 << 1,
    Broker =        1 << 2,
    Claims =        1 << 3,
    Underwriter =   1 << 4
}

@Rest()
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