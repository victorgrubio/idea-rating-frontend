import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Idea} from "../models/idea";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  private apiUrl = `${environment.apiUrl}`
  constructor(private httpClient: HttpClient) { }

  listUserIdeas(username: string): Observable<Idea[]>{
    let url = `${this.apiUrl}/${username}/ideas`
    return this.httpClient.get<Idea[]>(url);
  }
}
