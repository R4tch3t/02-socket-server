import { Column, Entity, Index, OneToMany } from "typeorm";
import { ConvocatoriasBeca } from "./ConvocatoriasBeca";

@Index("SYS_C007040", ["id"], { unique: true })
@Entity("PERIODOS_BECA")
export class PeriodosBeca {
  @Column("number", { primary: true, name: "ID", precision: 10, scale: 0 })
  id: number;

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

  @OneToMany(
    () => ConvocatoriasBeca,
    (convocatoriasBeca) => convocatoriasBeca.periodo
  )
  convocatoriasBecas: ConvocatoriasBeca[];
}
