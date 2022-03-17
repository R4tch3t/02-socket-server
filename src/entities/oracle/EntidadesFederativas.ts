import { Column, Entity, Index, OneToMany } from "typeorm";
import { Municipios } from "./Municipios";

@Index("SYS_C007064", ["id"], { unique: true })
@Entity("ENTIDADES_FEDERATIVAS")
export class EntidadesFederativas {
  @Column("number", { primary: true, name: "ID", precision: 10, scale: 0 })
  id: number;

  @Column("varchar2", { name: "NOMBRE", length: 100 })
  nombre: string;

  @Column("varchar2", { name: "ABREVIATURA", length: 10 })
  abreviatura: string;

  @OneToMany(() => Municipios, (municipios) => municipios.entidadFederativa)
  municipios: Municipios[];
}
