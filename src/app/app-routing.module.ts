import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificacionComponent } from './componentes/identificacion/identificacion.component';
import { ChatComponent } from './componentes/chat/chat.component';

const routes: Routes = [
  { path: '', component: IdentificacionComponent, pathMatch: 'full' },
  { path: 'chat/:id', component: ChatComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
