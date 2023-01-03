import { Component } from '@angular/core';
import {FormGroup,FormBuilder,Validators,NG_VALIDATORS} from "@angular/forms";
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm:any = this.fb.group(
    {
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    }
  );
  constructor(private authService: AuthenticationService, private fb: FormBuilder){}

  get email(): any {
    return this.registerForm.get('email');
  }

  get password(): any {
    return this.registerForm.get('password');
  }

  register():void{
    this.authService.register(this.email.value,this.password.value)
  }

  googleAuth():void{
    this.authService.GoogleAuth();
  }
}
