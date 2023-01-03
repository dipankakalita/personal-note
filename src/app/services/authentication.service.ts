import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public afAuth: AngularFireAuth, private router:Router, private cookieService:CookieService) { 
    this.checkAuthState();
    // this.logout();
  }

  register(email:string, password:string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert('You have been successfully registered!');
        this.cookieService.set('userID', result.user?.uid!,1,undefined,undefined,true,'Strict');
        this.cookieService.set('userName', result.user?.email!,1,undefined,undefined,true,'Strict');
        this.router.navigateByUrl("");
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign in with email/password
  login(email:string, password:string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user?.uid!);
        this.cookieService.set('userID', result.user?.uid!,1,undefined,undefined,true,'Strict');
        this.cookieService.set('userName', result.user?.email!,1,undefined,undefined,true,'Strict');
        // this.router.navigateByUrl("/dashboard");
      })
      .catch((error) => {
        alert(error.message);
        window.alert(error.message);
      });
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
        this.cookieService.set('userID', result.user?.uid!,1,undefined,undefined,true,'Strict');
        this.cookieService.set('userName', result.user?.email!,1,undefined,undefined,true,'Strict');
        // this.router.navigateByUrl("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  checkAuthState():void{
    this.afAuth.authState.subscribe((response:any)=>{
      console.log("checkAuthState",response);
      if(response != null){
        this.router.navigateByUrl('/dashboard');
      }
      else{
        console.log("no data");
        
      }
    })
  }

  logout():void{
    this.afAuth.signOut().then(()=>{
      console.log('Signout done');
      this.cookieService.deleteAll();
      this.router.navigateByUrl('/');
    })
  }
}
