import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GasolinerasComponent } from './gasolineras/gasolineras.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { LogsComponent } from './logs/logs.component';
import { MapaComponent } from './mapa/mapa.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { MessageCreateComponent } from './message-create/message-create.component';
import { MessagesComponent } from './messages/messages.component';
import { PaypalComponent } from './paypal/paypal.component';
import { ReservaCreateComponent } from './reserva-create/reserva-create.component';
import { ReservaDetailsComponent } from './reserva-details/reserva-details.component';
import { ReservaModifyComponent } from './reserva-modify/reserva-modify.component';
import { ReservasViviendaComponent } from './reservas-vivienda/reservas-vivienda.component';
import { ReservasComponent } from './reservas/reservas.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ViviendaCreateComponent } from './vivienda-create/vivienda-create.component';
import { ViviendaDetailsComponent } from './vivienda-details/vivienda-details.component';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { ViviendaModifyComponent } from './vivienda-modify/vivienda-modify.component';
import { ViviendasComponent } from './viviendas/viviendas.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'mapa', component: MapaComponent},
  { path: 'usuario/:id', component: UsuarioComponent },
  { path: 'reserva/:id', component: ReservaDetailsComponent },
  { path: 'vivienda/:id', component: ViviendaDetailsComponent },
  { path: 'message-details', component: MessageDetailsComponent },
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'viviendas/:id', component: ViviendasComponent},
  {path: 'reservas/:id', component: ReservasComponent},
  {path: 'newVivienda', component: ViviendaCreateComponent},
  {path: 'newMessage', component: MessageCreateComponent},
  {path: 'newReserva/:id', component: ReservaCreateComponent},
  {path: 'modifyReserva/:id', component: ReservaModifyComponent},
  {path: 'modifyVivienda/:id', component: ViviendaModifyComponent},
  {path: 'reservasVivienda/:id', component: ReservasViviendaComponent},
  {path: 'gasolineras', component: GasolinerasComponent},
  {path: 'logs', component: LogsComponent},
  {path: "paypal", component: PaypalComponent},
  {path: 'chat/:id', component: MensajesComponent},
  {path: 'messages/:id', component: MessagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
