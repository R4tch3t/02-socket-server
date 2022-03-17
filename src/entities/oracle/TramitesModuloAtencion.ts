import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { TramitesTramite } from "./TramitesTramite";

@Index("IDX_B16A7109820C2849", ["tramiteId"], {})
@Index("SYS_C007098", ["id"], { unique: true })
@Entity("TRAMITES_MODULO_ATENCION")
export class TramitesModuloAtencion {
  @Column("number", { primary: true, name: "ID", precision: 10, scale: 0 })
  id: number;

  @Column("number", { name: "TRAMITE_ID", precision: 10, scale: 0 })
  tramiteId: number;

  @Column("varchar2", { name: "NOMBRE", length: 255 })
  nombre: string;

  @Column("varchar2", { name: "RESPONSABLE", length: 255 })
  responsable: string;

  @Column("varchar2", { name: "TELEFONO", length: 50 })
  telefono: string;

  @Column("date", { name: "FECHA_CREACI�ON" })
  fechaCreaciOn: Date;

  @Column("date", {
    name: "FECHA_ACTUALIZACION",
    nullable: true,
    default: () => "NULL",
  })
  fechaActualizacion: Date | null;

  @Column("varchar2", {
    name: "LATITUDE",
    nullable: true,
    length: 20,
    default: () => "NULL",
  })
  latitude: string | null;

  @Column("varchar2", {
    name: "LONGITUD",
    nullable: true,
    length: 20,
    default: () => "NULL",
  })
  longitud: string | null;

  @ManyToOne(
    () => TramitesTramite,
    (tramitesTramite) => tramitesTramite.tramitesModuloAtencions
  )
  @JoinColumn([{ name: "TRAMITE_ID", referencedColumnName: "id" }])
  tramite: TramitesTramite;
}
