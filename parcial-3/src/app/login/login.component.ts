import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthGuardService } from '../services/auth-guard.service';
import { CredentialResponse } from 'google-one-tap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../styles.css']
})
export class LoginComponent implements OnInit{

  
  private clientId = environment.clientId

  constructor(
    private router: Router,
    private service: AuthGuardService,
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
        google.accounts.id.prompt((notification: PromptMomentNotification) => {});
      };
    }

    async handleCredentialResponse(response: CredentialResponse) {
      debugger;
      await this.service.LoginWithGoogle(response.credential).subscribe(
        (x:any) => {
          console.log(x);
          debugger;
          localStorage.setItem("token", x.token);
          localStorage.setItem("id", x.id)
          this._ngZone.run(() => {
            this.router.navigate(['/']);
          })},
        (error:any) => {
            console.log(error);
          }
        );  
  }

  
}
