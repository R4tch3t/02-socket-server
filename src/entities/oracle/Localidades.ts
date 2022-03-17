import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CasaEstudiante } from "./CasaEstudiante";
import { Municipios } from "./Municipios";

@Index("IDX_7A9712DA58BC1BE0", ["municipioId"], {})
@Index("SYS_C007076", ["id"], { unique: true })
@Entity("LOCALIDADES")
export class Localidades {
  @Column("number", { primary: true, name: "ID", precision: 10, scale: 0 })
  id: number;

  @Column("number", { name: "MUNICIPIO_ID", precision: 10, scale: 0 })
  municipioId: number;

  @Column("number", { name: "CLAVE", precision: 10, scale: 0 })
  clave: number;

  @Column("varchar2", { name: "NOMBRE", length: 100 })
  nombre: string;

  @Column("number", { name: "CLAVE_MUNICIPIO", precision: 10, scale: 0 })
  claveMunicipio: number;

  @Column("varchar2", { name: "AMBITO", length: 1 })
  ambito: string;

  @Column("varchar2", { name: "LATITUD", length: 20 })
  latitud: string;

  @Column("varchar2", { name: "LONGITUD", length: 20 })
  longitud: string;

  @Column("varchar2", { name: "ALTITUD", length: 20 })
  altitud: string;

  @Column("varchar2", { name: "CLAVE_CARTA", length: 20 })
  claveCarta: string;

  @Column("number", { name: "CLAVE_ENTIDAD", precision: 10, scale: 0 })
  claveEntidad: number;

  @OneToMany(() => CasaEstudiante, (casaEstudiante) => casaEstudiante.locality)
  casaEstudiantes: CasaEstudiante[];

  @ManyToOne(() => Municipios, (municipios) => municipios.localidades)
  @JoinColumn([{ name: "MUNICIPIO_ID", referencedColumnName: "id" }])
  municipio: Municipios;
}
