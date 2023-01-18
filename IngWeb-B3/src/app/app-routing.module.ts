import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GasolinerasComponent } from './gasolineras/gasolineras.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MapaComponent } from './mapa/mapa.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AparcamientosComponent } from './aparcamientos/aparcamientos.component';
import { AparcamientosCreateComponent } from './aparcamientos-create/aparcamientos-create.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'mapa', component: MapaComponent},
  { path: 'usuario/:id', component: UsuarioComponent },
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'gasolineras', component: GasolinerasComponent},
  {path: 'aparcamientos', component: AparcamientosComponent},
  {path: 'newImagen', component: AparcamientosCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
