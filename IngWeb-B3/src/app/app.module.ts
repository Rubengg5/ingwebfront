import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CloudinaryModule } from '@cloudinary/ng';
import { AppComponent } from './app.component';
import { MapaComponent } from './mapa/mapa.component';
import { AppRoutingModule } from './app-routing.module';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { GasolinerasComponent } from './gasolineras/gasolineras.component';
import { LogoutComponent } from './logout/logout.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { AparcamientosComponent } from './aparcamientos/aparcamientos.component';
import { AparcamientosCreateComponent } from './aparcamientos-create/aparcamientos-create.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LoginComponent,
    MapaComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    GasolinerasComponent,
    LogoutComponent,
    AparcamientosComponent,
    AparcamientosCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CloudinaryModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    FormsModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('182737891985-bhlpao31dj89qgu93i4pp3die544nomb.apps.googleusercontent.com') // your client id
        }
      ]
    }
  },
  //AuthGuardService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
