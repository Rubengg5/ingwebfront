import { Component, NgZone, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { CredentialResponse } from 'google-one-tap';
import { environment } from '../../environments/environment';
// import { LogService } from '../services/log.service';
import { Log } from '../models/log';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../styles.css']
})
export class LoginComponent implements OnInit {


  private clientId = environment.clientId

  log: Log = {
    timestamp: "",
    usuario: "",
    caducidad: "",
    token: ""
  }

  constructor(
    private router: Router,
    private service: AuthGuardService,
    // private logService: LogService,
    private _ngZone: NgZone) { }

  ngOnInit(): void {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: '182737891985-808001okoua1q3me4rkooecn9qdhkhoj.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", width: "100%" }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });
    };
  }

  async handleCredentialResponse(response: CredentialResponse) {

    await this.service.LoginWithGoogle(response.credential).subscribe(
      (x: any) => {
        localStorage.setItem("token", x.token);
        localStorage.setItem("id", x.id);
        // localStorage.setItem("usuario", x.usuario);
        // localStorage.setItem("caducidad", x.caducidad);

        console.log(response.credential);
        // console.log(x.usuario);
        // console.log(x.caducidad);
        console.log(localStorage);

        // this.log.token = x.token;
        // this.log.usuario = x.id;
        // this.log.caducidad = x.caducidad;
        // this.log.timestamp = (new Date(Date.now())).toLocaleDateString();
        // this.logService.createLog(this.log);
        // console.log(this.log);

        this._ngZone.run(() => {
          this.router.navigate(['/']);
        })
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  actualizar() {
    window.location.reload()
  }

}
