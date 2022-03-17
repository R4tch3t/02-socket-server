import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { TramitesTramite } from "./TramitesTramite";

@Index("IDX_90FC45A1820C2849", ["tramiteId"], {})
@Index("SYS_C007108", ["id"], { unique: true })
@Entity("TRAMITES_REQUISITO")
export class TramitesRequisito {
  @Column("number", { primary: true, name: "ID", precision: 10, scale: 0 })
  id: number;

  @Column("number", { name: "TRAMITE_ID", precision: 10, scale: 0 })
  tramiteId: number;

  @Column("clob", { name: "DESCRIPCION" })
  descripcion: string;

  @Column("number", { name: "NUMERO_COPIAS", precision: 10, scale: 0 })
  numeroCopias: number;

  @Column("number", { name: "REQUIERE_ORIGINAL", precision: 1, scale: 0 })
  requiereOriginal: number;

  @Column("varchar2", { name: "DOCUMENTO_EJEMPLO", length: 255 })
  documentoEjemplo: string;

  @Column("number", { name: "ACTIVO", precision: 1, scale: 0 })
  activo: number;

  @Column("date", { name: "FECHA_CREACION" })
  fechaCreacion: Date;

  @Column("date", { name: "FECHA_ACTUALIZACION" })
  fechaActualizacion: Date;

  @ManyToOne(
    () => TramitesTramite,
    (tramitesTramite) => tramitesTramite.tramitesRequisitos
  )
  @JoinColumn([{ name: "TRAMITE_ID", referencedColumnName: "id" }])
  tramite: TramitesTramite;
}
