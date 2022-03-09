import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@ObjectType()
@Index("Mensaje_pkey", ["id"], { unique: true })
@Entity("Mensaje", { schema: "public" })
export class Mensaje extends BaseEntity {
  
  @Field()
  //@Column("integer", { primary: true, name: "id" })
  //@PrimaryGeneratedColumn() OTHER DATABASE
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

  @Column('number',{name:'de',nullable: true})
  @Field(()=>Usuario,{nullable: true})
  @ManyToOne(() => Usuario, (usuario) => usuario.msj_de)
  @JoinColumn([{ name: "de", referencedColumnName: "id" }])
  de!: Usuario;

  @Column('number',{name:'para',nullable: true})
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
