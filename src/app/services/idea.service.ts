import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Idea} from "../models/idea";
import {Observable} from "rxjs";
import {DataStorageService} from "./data-storage.service";

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  private apiUrl = `${environment.apiUrl}`
  constructor(private httpClient: HttpClient, private dataStorageService: DataStorageService) { }

  listUserIdeas(username: string): Observable<Idea[]>{
    let url = `${this.apiUrl}/${username}/ideas`
    return this.httpClient.get<Idea[]>(url);
  }

  getById(id: number): Observable<Idea> {
    let username: string = this.dataStorageService.getUser().username;
    let url = `${this.apiUrl}/${username}/ideas/${id}`
    return this.httpClient.get<Idea>(url);

  }

  create(body: any) {
    let username: string = this.dataStorageService.getUser().username;
    let url = `${this.apiUrl}/${username}/ideas`
    return this.httpClient.post<Idea>(url, body)

  }

  update(id: number, body: any) {
    let username: string = this.dataStorageService.getUser().username;
    let url = `${this.apiUrl}/${username}/ideas/${id}`
    return this.httpClient.put<Idea>(url, body)
  }

  delete(id: number){
    let username: string = this.dataStorageService.getUser().username;
    let url = `${this.apiUrl}/${username}/ideas/${id}`
    return this.httpClient.delete<Idea>(url)

  }
}
