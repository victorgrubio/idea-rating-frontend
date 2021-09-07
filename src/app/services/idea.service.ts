import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Idea} from "../models/ideas/idea";
import {Observable} from "rxjs";
import {DataStorageService} from "./data-storage.service";
import {EvaluationSentenceType, EvaluationSentenceWeight} from "../models/ideas/evaluation-sentence";
import {UserVote} from "../models/ideas/user-vote";

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
    let username: string = this.dataStorageService.getUser().username!;
    let url = `${this.apiUrl}/${username}/ideas/${id}`
    return this.httpClient.get<Idea>(url);
  }


  getByIdAndUsername(id: number, username: string): Observable<Idea> {
    let url = `${this.apiUrl}/${username}/ideas/${id}`
    return this.httpClient.get<Idea>(url);
  }

  create(body: Idea) {
    let username: string = this.dataStorageService.getUser().username!;
    let url = `${this.apiUrl}/${username}/ideas`
    return this.httpClient.post<Idea>(url, body)

  }

  update(id: number, body: Idea) {
    console.log(body)
    let username: string = this.dataStorageService.getUser().username!;
    let url = `${this.apiUrl}/${username}/ideas/${id}`
    return this.httpClient.put<Idea>(url, body)
  }

  delete(id: number){
    let username: string = this.dataStorageService.getUser().username!;
    let url = `${this.apiUrl}/${username}/ideas/${id}`
    return this.httpClient.delete<Idea>(url)

  }

  getSentenceWeights() {
    let url = `${this.apiUrl}/ideas/sentence-weights`
    return this.httpClient.get<EvaluationSentenceWeight[]>(url)
  }

  voteIdea(username: string, ideaId: number, userVote: UserVote){
    let url = `${this.apiUrl}/${username}/ideas/${ideaId}/votes`
    console.log('Voting idea ')
    console.log(userVote);
    console.log(url)
    return this.httpClient.post<Idea>(url, userVote)
  }
}
