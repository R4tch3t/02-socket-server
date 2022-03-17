import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Tabentalu } from "./Tabentalu";
import { CasaEstudiante } from "./CasaEstudiante";

@Index("IDX_1C969EFD15DF1885", ["matricula"], {})
@Index("IDX_1C969EFD407243A2", ["casaId"], {})
@Index("SYS_C007049", ["id"], { unique: true })
@Entity("ALUMNOS_CON_CASA")
export class AlumnosConCasa {
  @Column("number", { primary: true, name: "ID", precision: 10, scale: 0 })
  id!: number;

  @Column("varchar2", { name: "MATRICULA", length: 8 })
  matricula!: string;

  @Column("number", { name: "CASA_ID", precision: 10, scale: 0 })
  casaId!: number;

  @Column("date", { name: "FECHA_INGRESO" })
  fechaIngreso!: Date;

  @Column("varchar2", {
    name: "OBSERVACIONES",
    nullable: true,
    length: 255,
    default: () => "NULL",
  })
  observaciones!: string | null;

  @Column("number", { name: "ACTIVO", precision: 1, scale: 0 })
  activo!: number;

  @ManyToOne(() => Tabentalu, (tabentalu) => tabentalu.alumnosConCasas)
  @JoinColumn([{ name: "MATRICULA", referencedColumnName: "cveentalu" }])
  matricula2!: Tabentalu;

  @ManyToOne(
    () => CasaEstudiante,
    (casaEstudiante) => casaEstudiante.alumnosConCasas
  )
  @JoinColumn([{ name: "CASA_ID", referencedColumnName: "id" }])
  casa!: CasaEstudiante;
}
