import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { TramitesTramite } from "./TramitesTramite";

@Index("IDX_C4DF991C820C2849", ["tramiteId"], {})
@Index("SYS_C007091", ["id"], { unique: true })
@Entity("TRAMITES_FORMATO_DESCARGABLE")
export class TramitesFormatoDescargable {
  @Column("number", { primary: true, name: "ID", precision: 10, scale: 0 })
  id: number;

  @Column("number", { name: "TRAMITE_ID", precision: 10, scale: 0 })
  tramiteId: number;

  @Column("varchar2", { name: "NOMBRE", length: 255 })
  nombre: string;

  @Column("clob", { name: "DESCRIPCION" })
  descripcion: string;

  @Column("varchar2", { name: "DOCUMENTO", length: 255 })
  documento: string;

  @Column("date", { name: "FECHA_CREACION" })
  fechaCreacion: Date;

  @Column("date", { name: "FECHA_ACTUALIZACION" })
  fechaActualizacion: Date;

  @ManyToOne(
    () => TramitesTramite,
    (tramitesTramite) => tramitesTramite.tramitesFormatoDescargables
  )
  @JoinColumn([{ name: "TRAMITE_ID", referencedColumnName: "id" }])
  tramite: TramitesTramite;
}
