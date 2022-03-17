import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Tabentalu } from "./Tabentalu";
import { ConvocatoriasBeca } from "./ConvocatoriasBeca";

@Index("IDX_E9E1431515DF1885", ["matricula"], {})
@Index("IDX_E9E143151D749D82", ["becaId"], {})
@Index("SYS_C007031", ["id"], { unique: true })
@Entity("ALUMNOS_CON_BECA")
export class AlumnosConBeca {
  @Column("number", { primary: true, name: "ID", precision: 10, scale: 0 })
  id!: number;

  @Column("varchar2", { name: "MATRICULA", length: 8 })
  matricula!: string;

  @Column("number", { name: "BECA_ID", precision: 10, scale: 0 })
  becaId!: number;

  @Column("number", { name: "STATUS", precision: 1, scale: 0 })
  status!: number;

  @Column("varchar2", { name: "MESES_OTORGADOS", length: 2 })
  mesesOtorgados!: string;

  @Column("number", { name: "MONTO", precision: 7, scale: 2 })
  monto!: number;

  @Column("timestamp", { name: "FECHA_CREACION", scale: 0 })
  fechaCreacion!: Date;

  @Column("timestamp", { name: "FECHA_ACTUALIZACION", scale: 0 })
  fechaActualizacion!: Date;

  @ManyToOne(() => Tabentalu, (tabentalu) => tabentalu.alumnosConBecas)
  @JoinColumn([{ name: "MATRICULA", referencedColumnName: "cveentalu" }])
  matricula2!: Tabentalu;

  @ManyToOne(
    () => ConvocatoriasBeca,
    (convocatoriasBeca) => convocatoriasBeca.alumnosConBecas
  )
  @JoinColumn([{ name: "BECA_ID", referencedColumnName: "id" }])
  beca!: ConvocatoriasBeca;
}
