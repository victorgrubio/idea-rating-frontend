import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {DataStorageService} from "../../services/data-storage.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form: {[id: string]: string} = {
    username: "",
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  user: User = new User();

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let user: User = this.dataStorageService.getUser();
    if (user.username !== "") {
      this.isLoggedIn = true;
      this.user = user;
      this.router.navigate([`/${user.username}/ideas`])
    }
  }

  isEmptyObject(obj: Object) {
    return (obj && (Object.keys(obj).length === 0));
  }


  onSubmit(): void {
    let { username } = this.form;

    this.authService.login(username).subscribe(
      (data: User) => {
        this.dataStorageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }



}
