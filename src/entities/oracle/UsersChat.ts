import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany,getConnection, ObjectIdColumn, OneToMany, PrimaryGeneratedColumn, BeforeInsert, getManager, EntityManager } from "typeorm";
//import { Mensaje } from "./Mensaje";
@ObjectType()
//@Index("SYS_C007127", ["id"], { unique: true })
@Entity("USERS_CHAT")
export class UsersChat extends BaseEntity {
  
  @Field()
  @Column("number", { primary: true, name: "ID", precision: 10, scale: 0 })
  id: number;

  @Field(() => String)
  //@Column("character varying", { name: "uuid" })
  @Column("varchar2", { name: "UUID", length: 128 })
  uuid!: string;

  @Field(() => String)
  @Column("varchar2", { name: "MATRICULA", length: 8 })
  matricula!: string;

  @Field(() => String)
  @Column("varchar2", { name: "EMAIL", length: 180 })
  email!: string;

  @Field(() => String)
  @Column("varchar2", { name: "PASSWORD", length: 255 })
  password!: string;

  @Field(() => Int)
  @Column("number", { name: "ONLINE", precision: 1, scale: 0, nullable: true, default: () => "0" })
  online!: number;

  @Field(()=> String)
  @Column("timestamp", {
    name: "LASTCONN",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  lastConn!: Date;
  
  //@Field(()=> EntityManager)
  //manager!: EntityManager
  /*@Field(()=>[Mensaje],{nullable: true})
  @OneToMany(() => Mensaje, (mensaje) => mensaje.de)
  msj_de!: Mensaje[];

  @Field(()=>[Mensaje],{nullable: true})
  @OneToMany(() => Mensaje, (mensaje) => mensaje.para)
  msj_para!: Mensaje[];

  @Field(()=>[Mensaje],{nullable: true})
  @ManyToMany(() => Mensaje, (mensaje) => mensaje.paras)
  //@JoinColumn([{ name: "msj_para", referencedColumnName: "para" }])
  //@JoinTable()
  msj_paras!: Mensaje[];*/
  //@BeforeInsert()
  async beforeInsert(manager:EntityManager): Promise<void>{
    
    const res = await manager.query("select XE.USERS_CHAT_SEQ.nextval ID from dual");
    //const res = await manager.query("select XE.USERS_CHAT_SEQ.nextval ID from dual");
    //if(res&&res.length>0){
      this.id = res[0].ID
    //}
  }
  //@BeforeInsert()
  /*async beforeInsert(manager:any): Promise<void>{
    //const res = await getManager().query("select XE.USERS_CHAT_SEQ.nextval ID from dual");
    //const res = await manager.query("select XE.USERS_CHAT_SEQ.nextval ID from dual");
    const res = await manager.query("select ID from USERS_CHAT ORDER BY ID DESC");
    console.log(res)
    //if(res&&res.length>0){
      this.id = res.length>0 ? res[0].ID+1 : 1;
    //}
  }*/
}
