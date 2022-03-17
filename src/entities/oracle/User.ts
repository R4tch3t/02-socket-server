import { Column, Entity, Index } from "typeorm";

@Index("SYS_C007127", ["id"], { unique: true })
@Index("UNIQ_8D93D649E7927C74", ["email"], { unique: true })
@Entity("user")
export class User {
  @Column("number", { primary: true, name: "ID", precision: 10, scale: 0 })
  id: number;

  @Column("varchar2", { name: "EMAIL", length: 180 })
  email: string;

  @Column("clob", { name: "ROLES" })
  roles: string;

  @Column("varchar2", { name: "PASSWORD", length: 255 })
  password: string;

  @Column("varchar2", { name: "NAME", length: 60 })
  name: string;

  @Column("varchar2", { name: "LAST_NAME", length: 120 })
  lastName: string;

  @Column("varchar2", {
    name: "PHOTOGRAPHY",
    nullable: true,
    length: 255,
    default: () => "NULL",
  })
  photography: string | null;
}
