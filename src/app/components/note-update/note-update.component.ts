import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/service/note.service';

@Component({
  selector: 'app-note-update',
  templateUrl: './note-update.component.html',
  styleUrls: ['./note-update.component.css']
})
export class NoteUpdateComponent implements OnInit {

  noteId: number = 0;
  note: any;
  isNoteLoaded: boolean = false;

  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
    this.noteId = history.state[0];
    console.log("UPDATE : ", this.noteId);
    this.getNoteData();
  }

  getNoteData() {
    this.noteService.getSingleNote(this.noteId).subscribe((data) => {
      this.note = data;
      this.isNoteLoaded = true;
      console.log(this.note);
    });
  }

  noteUpdate() {
    let d = new Date();
    this.note.last_updated_time = (d.getFullYear())+"-"+("0" + (d.getMonth() + 1)).slice(-2)+"-"+("0" + d.getDate()).slice(-2)+" "+(("0" + d.getHours()).slice(-2)+":"+("0" + d.getMinutes()).slice(-2)+":"+("0" + d.getSeconds()).slice(-2)+"."+"000000");
    this.noteService.updateNote(this.noteId, this.note).subscribe((data) => {
      console.log('UPDATE SUCCESSFULLY', data);
      this.router.navigateByUrl("/");
    });
  }

}
