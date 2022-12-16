import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MapaComponent } from '../mapa/mapa.component';
import { MapaVistaComponent } from '../mapa-vista/mapa-vista.component';
import { XComponent } from '../x/x.component';
import { XDetailsComponent } from '../x-details/x-details.component';
import { InicioComponent } from '../inicio/inicio.component';
import { ImagenComponent } from '../imagen/imagen.component';
import { XCreateComponent } from '../x-create/x-create.component';
import { LogoutComponent } from '../logout/logout.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'mapa', component: MapaComponent},
  {path: 'vista-mapa', component: MapaVistaComponent},
  {path: 'imagen', component: ImagenComponent},
  {path: 'x', component: XComponent},
  {path: 'x/:id', component: XDetailsComponent},
  {path: '', component: InicioComponent},
  {path: 'crearx', component: XCreateComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
