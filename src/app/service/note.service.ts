import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Note } from '../common/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notesUrl;
  private httpHeaders: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.notesUrl = environment.notesUrl;
    const headers = {
      "Accept": "application/json",
      "Content-Type" : "application/json",
    };
    this.httpHeaders = new HttpHeaders(headers);
  }

  getNotes() : Observable<Note[]>{
    return this.httpClient
      .get<GetResponse>(this.notesUrl)
      .pipe(map(response => response._embedded.notes));
  }  
}

interface GetResponse {
  _embedded: {
    notes: Note[];
  }
}