import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {Subject} from "rxjs";


const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  public currentUser: Subject<User> = new Subject<User>();

  constructor() { }

  signOut(): void{
    window.sessionStorage.clear();
    this.currentUser.next(new User());
  }

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    console.log(user)
    this.currentUser.next(user);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      console.log('DataStorageService: Returning user ', user);
      this.currentUser.next(JSON.parse(user))
      return JSON.parse(user) as User;
    }
    console.log('DataStorageService: Returning empty user');
    return {};
  }
}
