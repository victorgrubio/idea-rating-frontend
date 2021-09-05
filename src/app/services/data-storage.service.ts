import { Injectable } from '@angular/core';
import {User} from "../models/user";


const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  signOut(): void{
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      console.log('DataStorageService: Returning user ', user);
      return JSON.parse(user);
    }
    console.log('DataStorageService: Returning empty user');
    return {};
  }
}
