import { Component } from '@angular/core';
import {FormGroup,FormBuilder,Validators,NG_VALIDATORS} from "@angular/forms";
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginBtn:boolean = true;
  loginForm:any = this.fb.group(
    {
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    }
  );
  constructor(private authService: AuthenticationService, private fb: FormBuilder){}

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  login():void{
    this.authService.login(this.email.value,this.password.value)
  }

  googleAuth():void{
    this.authService.GoogleAuth();
  }
}
