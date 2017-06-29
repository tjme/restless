import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import {apiType, Rest} from "../server/restless";
import {User} from "./User";

@Rest()
@Entity()
export class Contact {

    @PrimaryColumn("int", {generated: true})
    id: number;

    @Column({nullable: true})
    companyName: string;

    @CreateDateColumn({nullable: true})
    created: Date;

    @UpdateDateColumn({nullable: true})
    updated: Date;

    @OneToMany(type => User, "id", {cascadeInsert: true})
    users: User;

}