import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AlumnosConBeca } from "./AlumnosConBeca";
import { PeriodosBeca } from "./PeriodosBeca";

@Index("IDX_F657777C9C3921AB", ["periodoId"], {})
@Index("SYS_C007036", ["id"], { unique: true })
@Entity("CONVOCATORIAS_BECA")
export class ConvocatoriasBeca {
  @Column("number", { primary: true, name: "ID", precision: 10, scale: 0 })
  id: number;

  @Column("number", { name: "PERIODO_ID", precision: 10, scale: 0 })
  periodoId: number;

  @Column("varchar2", { name: "NOMBRE", length: 255 })
  nombre: string;

  @Column("varchar2", {
    name: "OBSERVACIONES",
    nullable: true,
    length: 255,
    default: () => "NULL",
  })
  observaciones: string | null;

  @Column("number", { name: "ACTIVO", precision: 1, scale: 0 })
  activo: number;

  @OneToMany(() => AlumnosConBeca, (alumnosConBeca) => alumnosConBeca.beca)
  alumnosConBecas: AlumnosConBeca[];

  @ManyToOne(
    () => PeriodosBeca,
    (periodosBeca) => periodosBeca.convocatoriasBecas
  )
  @JoinColumn([{ name: "PERIODO_ID", referencedColumnName: "id" }])
  periodo: PeriodosBeca;
}
