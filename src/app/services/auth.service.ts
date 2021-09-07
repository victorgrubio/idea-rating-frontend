import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../models/ideas/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authApi = `${environment.apiUrl}/auth/`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  login(username: string): Observable<User> {
    console.log('AuthService: Login in username ', username);
    return this.http.post<User>(this.authApi + 'login', {
      'username': username
    }, this.httpOptions);
  }
}
