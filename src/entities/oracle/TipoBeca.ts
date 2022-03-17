import { Column, Entity, Index } from "typeorm";

@Index("SYS_C007043", ["id"], { unique: true })
@Entity("TIPO_BECA")
export class TipoBeca {
  @Column("number", { primary: true, name: "ID", precision: 10, scale: 0 })
  id: number;

  @Column("varchar2", { name: "NOMBRE", length: 255 })
  nombre: string;

  @Column("varchar2", {
    name: "DESCRIPCION",
    nullable: true,
    length: 255,
    default: () => "NULL",
  })
  descripcion: string | null;
}
