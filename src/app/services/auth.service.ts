import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authApi = `${environment.apiUrl}/auth/`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  login(username: string): Observable<any> {
    return this.http.post(this.authApi + 'login', {
      username
    }, this.httpOptions);
  }
}
