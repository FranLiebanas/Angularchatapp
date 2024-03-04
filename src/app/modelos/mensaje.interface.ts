export interface Mensaje {
  id: number;
  remitenteId: number;
  remitente: string;
  destinatarioId: number;
  destinatario: string;
  fechaHora: Date;
  texto: string;
  fechaHoraFormateada: string;
}
