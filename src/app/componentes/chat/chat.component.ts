import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Mensaje } from 'src/app/modelos/mensaje.interface';
import { Usuario } from 'src/app/modelos/usuario.interface';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('mensajes') mensajeRef!: ElementRef;
  nombre: string = '';
  usuario!: Usuario;
  receptor!: Usuario;
  listaUsuarios: Usuario[] = [];
  conversacion: Mensaje[] = [];
  mensajeTexto: string = '';
  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private mensajeService: MensajesService
  ) {
    this.nombre = route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.usuarioService.getUsuariobyNombre(this.nombre).subscribe({
      next: async (data: Usuario) => {
        console.log(data);
        this.usuario = data;
      },
      error: (error) => {
        alert('Usuario no encontrado');
      },
      complete: () => {
        this.getContactos();
      },
    });
  }
  selectUser(user: Usuario) {
    this.receptor = user;
    this.getConversacion();
  }
  sendMessage() {
    this.mensajeService
      .enviarMensaje(this.mensajeTexto, this.usuario, this.receptor)
      .subscribe({
        next: (response) => {},
        complete: () => {
          this.getConversacion();
          this.mensajeTexto = '';
        },
      });
  }
  getContactos() {
    this.usuarioService.getListadoUsuarios().subscribe({
      next: (response) => {
        this.listaUsuarios = response.filter(
          (usuario) =>
            usuario.nombre !== this.usuario.nombre &&
            usuario.id !== this.usuario.id
        );
      },
    });
  }
  getConversacion() {
    forkJoin([
      this.mensajeService.getConversacion(this.usuario.id, this.receptor.id),
      this.mensajeService.getConversacion(this.receptor.id, this.usuario.id),
    ]).subscribe({
      next: (response) => {
        const conversacion = [...response[0], ...response[1]];
        this.conversacion = conversacion.sort(
          (a, b) =>
            new Date(a.fechaHora).getTime() - new Date(b.fechaHora).getTime()
        );
      },
      complete: () => {
        this.scrollToBottom();
        setTimeout(() => {
          this.scrollToBottom();
        }, 1);
         //this.intervalConversacion()
      },
    });
  }


  scrollToBottom() {
    if (this.mensajeRef) {
      this.mensajeRef.nativeElement.scrollTop =
        this.mensajeRef.nativeElement.scrollHeight;
    }
  }
  intervalConversacion() {
    setInterval(() => {
      this.getConversacion();
    }, 5000);
  }
}
