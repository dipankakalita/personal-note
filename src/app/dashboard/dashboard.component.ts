import { Component } from '@angular/core';
import {FormGroup,FormBuilder,Validators,NG_VALIDATORS} from "@angular/forms";
import { CurdService } from './../services/curd.service';
import { AuthenticationService } from './../services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CookieService]
})
export class DashboardComponent {
  modelTitle:string = '';
  formBtn:string = '';
  currentID:string = '';
  allNote:any[] = [];
  allShared:any[] = [];
  noteForm:any = this.fb.group(
    {
      note: ['',[Validators.required]]
    }
  );
  constructor(private curdService: CurdService, private fb: FormBuilder, private cookieService:CookieService, private modalService: NgbModal, private authService:AuthenticationService){
    this.fetchNotes();
  }

  get note(): any {
    return this.noteForm.get('note');
  }

  openNote(content:any, modelTitle:string, data:any) { 
    this.modelTitle = modelTitle;
    this.modalService.open(content, { size: 'md' })
    if(modelTitle == "Update Note"){
      this.note.setValue(data.note);
      this.formBtn = "UPDATE";
      this.currentID = data.id;
    }
    else{
      this.note.setValue("");
      this.formBtn = "ADD";
    }
  }

  addNote():void{
    if(this.noteForm.valid) {
      this.noteForm.value['userID'] = this.cookieService.get('userID');
      if(this.modelTitle == "Update Note"){
        this.curdService.updateDataById("notes",this.currentID,this.noteForm.value)
        .then((res:any) => {
          // alert("Note updated successfully");
          this.noteForm.reset();
          this.modalService.dismissAll();
        });
      }
      else{
        this.curdService.insert("notes",this.noteForm.value)
        .then((res:any) => {
          // alert("Note added successfully");
          this.noteForm.reset();
          this.modalService.dismissAll();
        })
      }
      ;
    }
  }

  fetchNotes():void{
    console.log("0");
    const api = this.curdService.getDataByColumnName("notes", "userID","==", this.cookieService.get('userID'));
    api.subscribe((dbInfo:any)=>{
      this.allNote = [];
      console.log("1");
      dbInfo.map((res:any)=>{
        console.log("2");
        let record = res.payload.doc.data();
        record['id'] = res.payload.doc.id;
        record['shared'] = false;
        this.allNote.push(record);
      })
      console.log("3");
    })
    console.log("33");
    // shared data
    const sharedapi = this.curdService.getDataByColumnName("shared", "userID","!=", this.cookieService.get('userID'));
      sharedapi.subscribe((dbInfos:any)=>{
        this.allShared = [];
        console.log("4");
        dbInfos.map((response:any)=>{
          let sharedRecord = response.payload.doc.data();
          sharedRecord['shared'] = true;
          this.allShared.push(sharedRecord);
        })
        console.log("5");
      })
      console.log(this.allNote);
      console.log(this.allShared);
  }

  deleteRecord(id:string){
    this.curdService.deleteDataById("notes",id)
        .then((res:any) => {
          // alert("Note deleted successfully");
      });
  }

  logout():void{
    this.authService.logout();
  }

  shareRecord(note:any):void{
    if(note.isShared){
      let newData = {
        "note": note.note,
        "userID": note.userID,
        "isShared":false,
        "sharedId":""
      };
      
      this.curdService.updateDataById("notes",note.id,newData)
      .then((res:any) => {
        note['userName'] = this.cookieService.get('userName');
        console.log(note);
        console.log(note.sharedId);
        
        this.curdService.deleteDataById("shared",note.sharedId)
          .then((res:any) => {
            // alert("Share Stoped successfully");
        });
      });
    }
    else{
      note['userName'] = this.cookieService.get('userName');
        this.curdService.insert("shared",note)
            .then((res:any) => {
              console.log(res);
              let newData = {
                "note": note.note,
                "userID": note.userID,
                "isShared":true,
                "sharedId":res.id
              }
              this.curdService.updateDataById("notes",note.id,newData)
              .then((res:any) => {
                // alert("Shared successfully");
              });
        })
      ;
    }
  }
}
