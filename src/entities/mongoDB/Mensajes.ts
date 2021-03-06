import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, getConnection, ManyToMany, ManyToOne, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@ObjectType()
@Index("Mensajes_pkey", ["id"], { unique: true })
@Entity("Mensajes", { schema: "public" })
export class Mensajes extends BaseEntity {
  
  @Field()
  //@Column("integer", { primary: true, name: "id" })
  //@PrimaryGeneratedColumn() sql DATABASE
  @ObjectIdColumn() //MONGO
  id!: number;

  @Field(() => String)
  @Column("text", { name: "mensaje", nullable: true })
  mensaje!: string | null;

  @Field(()=> String)
  @Column("timestamp without time zone", {
    name: "time",
    nullable: true,
    default: () => "now()",
  })
  @CreateDateColumn({ type: 'timestamp' })//MONGO
  time!: Date;

  @Field(() => Boolean)
  @Column("boolean", { name: "readed", nullable: true, default: () => "false" })
  readed!: boolean;

  @Column('string',{name:'de',nullable: true})
  @Field(()=>Usuario,{nullable: true})
  @ManyToOne(() => Usuario, (usuario) => usuario.msj_de)
  @JoinColumn([{ name: "de", referencedColumnName: "id" }])
  de!: Usuario;

  @Column('string',{name:'para',nullable: true})
  @Field(()=>Usuario,{nullable: true})
  @ManyToOne(() => Usuario, (usuario) => usuario.msj_para)
  @JoinColumn([{ name: "para", referencedColumnName: "id" }])
  para!: Usuario;

  @Field(()=>[Usuario],{nullable: true})
  @ManyToMany(() => Usuario, (usuario) => usuario.msj_paras)
  @JoinTable()
  @JoinColumn([{ name: "paras", referencedColumnName: "id" }])
  paras!: Usuario[];
}
