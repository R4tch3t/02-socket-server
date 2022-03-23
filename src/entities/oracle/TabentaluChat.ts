import { Column, Entity, OneToOne } from "typeorm";
import { UsersChat } from "./UsersChat";

@Entity("TABENTALU")
export class Tabentalu {
  @Column("varchar2", { primary: true, name: "CVEENTALU", length: 8 })
  cveentalu: string;

  @Column("varchar2", { name: "NOMENTALU", length: 60 })
  nomentalu: string;

  @Column("varchar2", { name: "APEENTALU", length: 100 })
  apeentalu: string;

  @Column("varchar2", { name: "CRPENTALU", length: 18 })
  crpentalu: string;

  @OneToOne(
    () => UsersChat,
    (userChat) => userChat.alumno
  )
  userChat: UsersChat;
}