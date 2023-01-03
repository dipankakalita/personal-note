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
      console.log(this.noteForm.value);
      if(this.modelTitle == "Update Note"){
        this.curdService.updateDataById("notes",this.currentID,this.noteForm.value)
        .then((res:any) => {
          alert("Note updated successfully");
          this.noteForm.reset();
          this.modalService.dismissAll();
        });
      }
      else{
        this.curdService.insert("notes",this.noteForm.value)
        .then((res:any) => {
          alert("Note added successfully");
          this.noteForm.reset();
          this.modalService.dismissAll();
        })
      }
      ;
    }
  }

  fetchNotes():void{
    // this.allNote = [];
    const api = this.curdService.getDataByColumnName("notes", "userID", this.cookieService.get('userID'));
    api.subscribe((dbInfo:any)=>{
      this.allNote = [];
      dbInfo.map((res:any)=>{
        let record = res.payload.doc.data();
        record['id'] = res.payload.doc.id;
        console.log(record);
        this.allNote.push(record);
      })
      console.log(this.allNote);
    })
  }

  deleteRecord(id:string){
    this.curdService.deleteDataById("notes",id)
        .then((res:any) => {
          alert("Note deleted successfully");
      });
  }

  logout():void{
    this.authService.logout();
  }
}
