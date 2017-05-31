import {Entity, PrimaryColumn, Column, ManyToMany, JoinTable} from "typeorm";
import {apiType, Rest} from "../restless";
import {Category} from "./Category";

@Rest()
@Entity()
export class Post {

    @PrimaryColumn("int", { generated: true })
    id: number;

    @Column()
    title: string;

    @Column("text")
    text: string;

    @ManyToMany(type => Category, {
        cascadeInsert: true
    })
    @JoinTable()
    categories: Category[];

}