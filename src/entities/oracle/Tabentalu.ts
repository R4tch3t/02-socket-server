import { Column, Entity, Index, OneToMany } from "typeorm";
import { AlumnosConBeca } from "./AlumnosConBeca";
import { AlumnosConCasa } from "./AlumnosConCasa";

@Index("SYS_C007022", ["cveentalu"], { unique: true })
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

  @Column("varchar2", { name: "CVENIVACA", length: 1 })
  cvenivaca: string;

  @Column("varchar2", { name: "CVEZONACA", length: 6 })
  cvezonaca: string;

  @Column("number", { name: "SEXENTALU", precision: 5, scale: 0 })
  sexentalu: number;

  @Column("number", { name: "EDOCIVALU", precision: 5, scale: 0 })
  edocivalu: number;

  @Column("timestamp", { name: "FECENTALU", scale: 0 })
  fecentalu: Date;

  @Column("varchar2", { name: "DOMENTALU", length: 155 })
  domentalu: string;

  @Column("varchar2", { name: "COLENTALU", length: 155 })
  colentalu: string;

  @Column("varchar2", { name: "CODPOSALU", length: 10 })
  codposalu: string;

  @Column("varchar2", { name: "TELENTALU", length: 50 })
  telentalu: string;

  @Column("number", { name: "ENTENTALU", precision: 5, scale: 0 })
  ententalu: number;

  @Column("number", { name: "MUNENTALU", precision: 5, scale: 0 })
  munentalu: number;

  @Column("varchar2", { name: "NOMLOCALU", length: 155 })
  nomlocalu: string;

  @Column("varchar2", { name: "RFCENTALU", length: 18 })
  rfcentalu: string;

  @Column("varchar2", { name: "MAILENTALU", length: 50 })
  mailentalu: string;

  @Column("number", { name: "ORIGCED", precision: 5, scale: 0 })
  origced: number;

  @Column("number", { name: "ORIGTIT", precision: 5, scale: 0 })
  origtit: number;

  @Column("number", { name: "ORIGCERT", precision: 5, scale: 0 })
  origcert: number;

  @Column("number", { name: "ORIGCONSEST", precision: 5, scale: 0 })
  origconsest: number;

  @Column("number", { name: "ORIGACTNAC", precision: 5, scale: 0 })
  origactnac: number;

  @Column("number", { name: "ORIGCERTMED", precision: 5, scale: 0 })
  origcertmed: number;

  @Column("number", { name: "CPYCED", precision: 5, scale: 0 })
  cpyced: number;

  @Column("number", { name: "CPYTIT", precision: 5, scale: 0 })
  cpytit: number;

  @Column("number", { name: "CPYCERT", precision: 5, scale: 0 })
  cpycert: number;

  @Column("number", { name: "CPYCONSEST", precision: 5, scale: 0 })
  cpyconsest: number;

  @Column("number", { name: "CPYACTNAC", precision: 5, scale: 0 })
  cpyactnac: number;

  @Column("number", { name: "CPYCERTMED", precision: 5, scale: 0 })
  cpycertmed: number;

  @Column("varchar2", { name: "OTROSDOC", length: 255 })
  otrosdoc: string;

  @Column("number", { name: "NUMFOTOS", precision: 5, scale: 0 })
  numfotos: number;

  @Column("varchar2", { name: "FOLCENEVAL", length: 255 })
  folceneval: string;

  @Column("varchar2", { name: "NOMEMIT", length: 20 })
  nomemit: string;

  @Column("timestamp", { name: "FECSYS", scale: 0 })
  fecsys: Date;

  @OneToMany(
    () => AlumnosConBeca,
    (alumnosConBeca) => alumnosConBeca.matricula2
  )
  alumnosConBecas: AlumnosConBeca[];

  @OneToMany(
    () => AlumnosConCasa,
    (alumnosConCasa) => alumnosConCasa.matricula2
  )
  alumnosConCasas: AlumnosConCasa[];
}
