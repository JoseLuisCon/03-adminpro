import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2 : any;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    recordar: [false],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicioUsuario: UsuarioService,
    private ngZone: NgZone
  ) {

  }

  ngOnInit(): void {
    this.renderButton();

  }

   login() {
    this.servicioUsuario.loginUsuario(this.loginForm.value).subscribe(
      (resp) => {
        Swal.fire({
          text: `Bienvenido: `,
          timer: 3000,
          icon: 'success',
        });
        if (this.loginForm.get('recordar')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      },
      (err) => {
        Swal.fire({
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }




  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 250,
      height: 50,
      longtitle: true,
      theme: 'dark'
    });
    this.startApp();
  }

  async startApp () {

    await this.servicioUsuario.googleInit();
    this.auth2 = this.servicioUsuario.auth2;
    this.attachSignin(document.getElementById('my-signin2'));

  };

  attachSignin(element: any  ) {

    this.auth2.attachClickHandler(element, {},
        (googleUser:any)=> {
          const id_token = googleUser.getAuthResponse().id_token;
          
          this.servicioUsuario.loginGoogle(id_token)
          .subscribe( resp =>
            this.ngZone.run(()=> {
              console.log('entramos en run navigator');
              this.router.navigateByUrl('/dashboard')

            })

          );

        }, (err: Error) =>{
          alert(JSON.stringify(err, undefined, 2));
        });
  }
}
