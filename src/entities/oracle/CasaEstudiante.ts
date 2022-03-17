import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AlumnosConCasa } from "./AlumnosConCasa";
import { Localidades } from "./Localidades";

@Index("IDX_12780C3688823A92", ["localityId"], {})
@Index("SYS_C007060", ["id"], { unique: true })
@Entity("CASA_ESTUDIANTE")
export class CasaEstudiante {
  @Column("number", { primary: true, name: "ID", precision: 10, scale: 0 })
  id: number;

  @Column("number", { name: "LOCALITY_ID", precision: 10, scale: 0 })
  localityId: number;

  @Column("varchar2", { name: "NOMBRE", length: 255 })
  nombre: string;

  @Column("number", { name: "ZONA", precision: 5, scale: 0 })
  zona: number;

  @Column("varchar2", { name: "CALLE", length: 255 })
  calle: string;

  @Column("varchar2", { name: "NUMERO_EXTERIOR", length: 10 })
  numeroExterior: string;

  @Column("varchar2", {
    name: "NUMERO_INTERIOR",
    nullable: true,
    length: 10,
    default: () => "NULL",
  })
  numeroInterior: string | null;

  @Column("varchar2", { name: "COLONIA", length: 255 })
  colonia: string;

  @Column("number", { name: "CODIGO_POSTAL", precision: 10, scale: 0 })
  codigoPostal: number;

  @Column("varchar2", { name: "TELEFONO", length: 20 })
  telefono: string;

  @Column("varchar2", {
    name: "EMAIL",
    nullable: true,
    length: 50,
    default: () => "NULL",
  })
  email: string | null;

  @Column("number", { name: "ACTIVO", precision: 1, scale: 0 })
  activo: number;

  @OneToMany(() => AlumnosConCasa, (alumnosConCasa) => alumnosConCasa.casa)
  alumnosConCasas: AlumnosConCasa[];

  @ManyToOne(() => Localidades, (localidades) => localidades.casaEstudiantes)
  @JoinColumn([{ name: "LOCALITY_ID", referencedColumnName: "id" }])
  locality: Localidades;
}
