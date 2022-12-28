import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Note } from '../common/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private httpHeaders: HttpHeaders;
  @Output() noteEmmiter: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {
    const headers = {
      "Accept": "application/json",
      "Content-Type" : "application/json",
      "Access-Control-Allow-Origin": "*"
    };
    this.httpHeaders = new HttpHeaders(headers);
  }

  getNotes() : Observable<Note[]>{
    return this.httpClient.get<GetResponse>(environment.notesUrl).pipe(retry(3), map(response => response._embedded.notes));
  }

  getSingleNote(noteId: number) {
    return this.httpClient.get(environment.notesUrl + '/' + noteId, { headers: this.httpHeaders}).pipe(retry(3), catchError(error => this.handleError(error)));
  }

  addNote(note: Note): Observable<any> {
    return this.httpClient.post(environment.addNoteUrl, note, { headers: this.httpHeaders}).pipe(retry(3), catchError(error => this.handleError(error)));
  }

  deleteNote(noteId: number): Observable<any> {
    return this.httpClient.delete(environment.deleteNoteUrl + "/" + noteId, { headers: this.httpHeaders}).pipe(retry(3), catchError(error => this.handleError(error)))
  }

  updateNote(noteId: number, note: Note): Observable<any>  {
    return this.httpClient.put<Note>(environment.updateNoteUrl + '/' + noteId, note, {headers: this.httpHeaders}).pipe(retry(3), catchError(error => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError(error);
  }

}

interface GetResponse {
  _embedded: {
    notes: Note[];
  }
}