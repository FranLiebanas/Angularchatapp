import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensaje } from '../modelos/mensaje.interface';
import { Usuario } from '../modelos/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class MensajesService {
  constructor(private http: HttpClient) {}

  getConversacion(emisor: number, receptor: number): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(
      `http://localhost:8081/api/mensajes/contacto/${emisor}/contacto/${receptor}`
    );
  }
  enviarMensaje(
    texto: string,
    remitente: Usuario,
    destinatario: Usuario
  ): Observable<Mensaje[]> {
    return this.http.post<any>(
      `http://localhost:8081/api/mensajes/enviar`,
      {
        "remitenteId": remitente.id,
        "destinatarioId": destinatario.id,
        "remitente": remitente.nombre,
        "destinatario": destinatario.nombre,
        "texto": texto,
      }
    );
  }
}
