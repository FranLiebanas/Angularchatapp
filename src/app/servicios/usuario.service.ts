import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}
  getUsuariobyNombre(usuario: string): Observable<Usuario> {
    return this.http.get<Usuario>(
      `http://localhost:8081/api/contacto/nombre/${usuario}`
    );
  }

  getListadoUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(
      `http://localhost:8081/api/contacto/listado`
    );
  }
}


