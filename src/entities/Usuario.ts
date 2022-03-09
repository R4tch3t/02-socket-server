import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ObjectIdColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Mensaje } from "./Mensaje";

@ObjectType()
@Index("Usuario_pkey", ["id"], { unique: true })
@Entity("Usuario", { schema: "public" })
export class Usuario extends BaseEntity {
 
  @Field()
  @ObjectIdColumn()//MONGO 
  //@PrimaryGeneratedColumn() //OTHER DATAB
  id!: number;

  @Field(() => String)
  @Column("character varying", { name: "uuid" })
  uuid!: string;

  @Field(() => String)
  @Column("character varying", { name: "nombre" })
  nombre!: string;

  @Field(() => String)
  @Column("character varying", { name: "email" })
  email!: string;

  @Field(() => String)
  @Column("character varying", { name: "password" })
  password!: string;

  @Field(() => Boolean)
  @Column("boolean", { name: "online", nullable: true, default: () => "false" })
  online!: boolean | null;

  @Field(()=>[Mensaje],{nullable: true})
  @OneToMany(() => Mensaje, (mensaje) => mensaje.de)
  msj_de!: Mensaje[];

  @Field(()=>[Mensaje],{nullable: true})
  @OneToMany(() => Mensaje, (mensaje) => mensaje.para)
  msj_para!: Mensaje[];

  @Field(()=>[Mensaje],{nullable: true})
  @ManyToMany(() => Mensaje, (mensaje) => mensaje.paras)
  //@JoinColumn([{ name: "msj_para", referencedColumnName: "para" }])
  //@JoinTable()
  msj_paras!: Mensaje[];
}
