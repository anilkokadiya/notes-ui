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
  }

  getNotes() {
    this.noteService.getNotes().subscribe((data) => {
      this.notes = data;
      console.log(this.notes);
    });
  }

}
