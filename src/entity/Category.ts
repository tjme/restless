import {Entity, PrimaryColumn, Column} from "typeorm";
import {apiType, Rest} from "../restless";

@Rest({prefix:"/categories"})
@Entity()
export class Category {

    @PrimaryColumn("int", { generated: true })
    id: number;

    @Column()
    name: string;

}