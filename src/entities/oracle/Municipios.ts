import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Localidades } from "./Localidades";
import { EntidadesFederativas } from "./EntidadesFederativas";

@Index("IDX_BBFAB5866961924A", ["entidadFederativaId"], {})
@Index("SYS_C007083", ["id"], { unique: true })
@Entity("MUNICIPIOS")
export class Municipios {
  @Column("number", { primary: true, name: "ID", precision: 10, scale: 0 })
  id: number;

  @Column("number", { name: "ENTIDAD_FEDERATIVA_ID", precision: 10, scale: 0 })
  entidadFederativaId: number;

  @Column("number", { name: "CLAVE", precision: 10, scale: 0 })
  clave: number;

  @Column("varchar2", { name: "NOMBRE", length: 100 })
  nombre: string;

  @Column("varchar2", { name: "CLAVE_CABECERA", length: 100 })
  claveCabecera: string;

  @Column("varchar2", { name: "NOMBRE_CABECERA", length: 100 })
  nombreCabecera: string;

  @OneToMany(() => Localidades, (localidades) => localidades.municipio)
  localidades: Localidades[];

  @ManyToOne(
    () => EntidadesFederativas,
    (entidadesFederativas) => entidadesFederativas.municipios
  )
  @JoinColumn([{ name: "ENTIDAD_FEDERATIVA_ID", referencedColumnName: "id" }])
  entidadFederativa: EntidadesFederativas;
}
