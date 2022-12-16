import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MapaComponent } from './mapa/mapa.component';
import { LoginComponent } from './login/login.component';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MapaVistaComponent } from './mapa-vista/mapa-vista.component';
import { XComponent } from './x/x.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { XDetailsComponent } from './x-details/x-details.component';
import { InicioComponent } from './inicio/inicio.component';
import { ImagenComponent } from './imagen/imagen.component';
import { XCreateComponent } from './x-create/x-create.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    LoginComponent,
    MapaVistaComponent,
    XComponent,
    HeaderComponent,
    FooterComponent,
    XDetailsComponent,
    InicioComponent,
    ImagenComponent,
    XCreateComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
