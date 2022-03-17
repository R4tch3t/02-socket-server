import { Column, Entity, Index, OneToMany } from "typeorm";
import { TramitesFormatoDescargable } from "./TramitesFormatoDescargable";
import { TramitesModuloAtencion } from "./TramitesModuloAtencion";
import { TramitesRequisito } from "./TramitesRequisito";

@Index("SYS_C007120", ["id"], { unique: true })
@Entity("TRAMITES_TRAMITE")
export class TramitesTramite {
  @Column("varchar2", {
    name: "PUBLICO_DIRIGIDO",
    nullable: true,
    length: 255,
    default: () => "NULL",
  })
  publicoDirigido: string | null;

  @Column("date", { name: "FECHA_CREACION" })
  fechaCreacion: Date;

  @Column("date", { name: "FECHA_ACTUALIZACION" })
  fechaActualizacion: Date;

  @Column("varchar2", {
    name: "DOCUMENTO_OBTIENE",
    nullable: true,
    length: 255,
    default: () => "NULL",
  })
  documentoObtiene: string | null;

  @Column("number", { name: "COSTO", precision: 10, scale: 0 })
  costo: number;

  @Column("number", { name: "TIEMPO_RESPUESTA", precision: 10, scale: 0 })
  tiempoRespuesta: number;

  @Column("clob", {
    name: "CONDICIONES",
    nullable: true,
    default: () => "NULL",
  })
  condiciones: string | null;

  @Column("varchar2", {
    name: "FUNDAMENTO_LEGAL",
    nullable: true,
    length: 255,
    default: () => "NULL",
  })
  fundamentoLegal: string | null;

  @Column("varchar2", {
    name: "WEBSITE",
    nullable: true,
    length: 255,
    default: () => "NULL",
  })
  website: string | null;

  @Column("number", {
    name: "TRAMITE_GRATIS",
    nullable: true,
    precision: 1,
    scale: 0,
    default: () => "NULL",
  })
  tramiteGratis: number | null;

  @Column("number", {
    name: "TRAMITE_PUBLICADO",
    nullable: true,
    precision: 1,
    scale: 0,
    default: () => "NULL",
  })
  tramitePublicado: number | null;

  @Column("clob", {
    name: "PROCEDIMIENTO_ENLINEA",
    nullable: true,
    default: () => "NULL",
  })
  procedimientoEnlinea: string | null;

  @Column("clob", {
    name: "PROCEDIMIENTO_MODULO",
    nullable: true,
    default: () => "NULL",
  })
  procedimientoModulo: string | null;

  @Column("number", {
    name: "VALIDADO",
    nullable: true,
    precision: 1,
    scale: 0,
    default: () => "NULL",
  })
  validado: number | null;

  @Column("varchar2", { name: "TIEMPO_VALIDEZ_DOCUMENTO", length: 255 })
  tiempoValidezDocumento: string;

  @Column("number", { primary: true, name: "ID", precision: 10, scale: 0 })
  id: number;

  @Column("varchar2", { name: "NOMBRE", length: 255 })
  nombre: string;

  @Column("varchar2", { name: "NOMBRE_CORTO", length: 255 })
  nombreCorto: string;

  @Column("varchar2", { name: "CLAVE", length: 20 })
  clave: string;

  @Column("clob", { name: "BENEFICIO" })
  beneficio: string;

  @Column("number", {
    name: "NECESITA_VALIDACION",
    nullable: true,
    precision: 1,
    scale: 0,
    default: () => "NULL",
  })
  necesitaValidacion: number | null;

  @Column("date", {
    name: "FECHA_INICIAL_VALIDACION",
    nullable: true,
    default: () => "NULL",
  })
  fechaInicialValidacion: Date | null;

  @Column("date", {
    name: "FECHA_FINAL_VALIDACION",
    nullable: true,
    default: () => "NULL",
  })
  fechaFinalValidacion: Date | null;

  @Column("number", {
    name: "REQUIERE_FIRMA_ELECTRONICA",
    precision: 1,
    scale: 0,
  })
  requiereFirmaElectronica: number;

  @OneToMany(
    () => TramitesFormatoDescargable,
    (tramitesFormatoDescargable) => tramitesFormatoDescargable.tramite
  )
  tramitesFormatoDescargables: TramitesFormatoDescargable[];

  @OneToMany(
    () => TramitesModuloAtencion,
    (tramitesModuloAtencion) => tramitesModuloAtencion.tramite
  )
  tramitesModuloAtencions: TramitesModuloAtencion[];

  @OneToMany(
    () => TramitesRequisito,
    (tramitesRequisito) => tramitesRequisito.tramite
  )
  tramitesRequisitos: TramitesRequisito[];
}
