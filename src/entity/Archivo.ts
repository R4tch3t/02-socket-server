import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity } from "typeorm";
import {Field, ObjectType} from 'type-graphql'

@ObjectType()
@Entity()
export class Archivo extends BaseEntity {
    
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column()
    filename!: string;

    @Field(()=>String)
    @Column()
    mimetype!: string;

    @Field(()=>String)
    @Column()
    encoding!: string;

    @Field(() => String)
    @CreateDateColumn({type: 'timestamp'})
    createdAt!: string

}