import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.css']
})
export class NotesAddComponent implements OnInit {

  fields = {};
  records = {};
  isShowNotesForm: boolean = false;
  note: any = {
    title: '',
    note: ''
  }

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
  }

  showNotesForm() {
    if (this.isShowNotesForm) {
      this.isShowNotesForm = false;
    } else {
      this.isShowNotesForm = true;
    }
  }

  addNewNote() {
    let d = new Date();    
    this.note.user_id = '12345';
    this.note.created_time = (d.getFullYear())+"-"+("0" + (d.getMonth() + 1)).slice(-2)+"-"+("0" + d.getDate()).slice(-2)+" "+(("0" + d.getHours()).slice(-2)+":"+("0" + d.getMinutes()).slice(-2)+":"+("0" + d.getSeconds()).slice(-2)+"."+"000000");
    this.note.last_updated_time = (d.getFullYear())+"-"+("0" + (d.getMonth() + 1)).slice(-2)+"-"+("0" + d.getDate()).slice(-2)+" "+(("0" + d.getHours()).slice(-2)+":"+("0" + d.getMinutes()).slice(-2)+":"+("0" + d.getSeconds()).slice(-2)+"."+"000000");
    this.fields = { fields: this.note};
    this.records = { records: [this.fields]};
    console.log("ADD NEW NOTE : ", this.note);

    this.noteService.addNote(this.note).subscribe(data=> {
      console.log(data);
      this.noteService.noteEmmiter.emit(this.records);
      this.hideNoteForm();
    });
  }

  hideNoteForm() {
    this.note = {
      id: '',
      user_id: '',
      title: '',
      note: '',
      created_time: ''
    };
    this.isShowNotesForm = false;
  }

}
