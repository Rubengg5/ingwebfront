import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MapaComponent } from '../mapa/mapa.component';
import { MapaVistaComponent } from '../mapa-vista/mapa-vista.component';
import { XComponent } from '../x/x.component';
import { XDetailsComponent } from '../x-details/x-details.component';
import { InicioComponent } from '../inicio/inicio.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'mapa', component: MapaComponent},
  {path: 'vista-mapa', component: MapaVistaComponent},
  {path: 'x', component: XComponent},
  {path: 'x/:id', component: XDetailsComponent},
  {path: '', component: InicioComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
