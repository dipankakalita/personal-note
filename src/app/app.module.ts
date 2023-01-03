import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyA1EXjz_VC4sqIG-ZMhMHfUmKw3_4EJsng",
      authDomain: "notes-vc.firebaseapp.com",
      projectId: "notes-vc",
      storageBucket: "notes-vc.appspot.com",
      messagingSenderId: "131239857326",
      appId: "1:131239857326:web:15376465f71f6f4853f13f",
      measurementId: "G-JB0RM4BRP1"
    }),
    AngularFireAuthModule,
    ReactiveFormsModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  firebaseConfig:any;
 }
