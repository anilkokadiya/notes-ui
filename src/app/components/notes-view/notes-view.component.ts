import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/common/note';
import { NoteService } from 'src/app/service/note.service';

@Component({
  selector: 'app-notes-view',
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.css']
})
export class NotesViewComponent implements OnInit {

  notes: Note[] = [];

  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
    this.getNotes();
    this.noteService.noteEmmiter.subscribe(() => {
      this.getNotes();
    });
  }

  getNotes() {
    this.noteService.getNotes().subscribe((data) => {
      this.notes = data;
      for(const i in this.notes) {
        this.notes[i].id = String(this.notes[i]._links.self.href).split("/").pop();
        this.notes[i].created_time = String(this.notes[i].created_time).split(".")[0];
        this.notes[i].last_updated_time = String(this.notes[i].last_updated_time).split(".")[0];
      }
      console.log(this.notes);
    });
  }

  deleteNote(noteId: number) {
    console.log(noteId);
    this.noteService.deleteNote(noteId).subscribe((data) => {
      this.noteService.noteEmmiter.emit(this.notes);
      console.log(data);
    });
  }

  editNote(noteId: number) {
    console.log(noteId);
    this.router.navigateByUrl('/notes/update/', { state: [noteId] });
  }

}
