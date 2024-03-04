import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.interface';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.scss']
})
export class IdentificacionComponent implements OnInit {
  nombre: string = '';
  constructor(private ruta: Router, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
  }

  entrar() {
    this.usuarioService.getUsuariobyNombre(this.nombre).subscribe({
      next: async (data:Usuario) => {
        this.ruta.navigate(['chat', data.nombre]);
      },
      error: () => {
        alert('Usuario no encontrado');
      },
      complete: () => {
      },
    });
  }
}
