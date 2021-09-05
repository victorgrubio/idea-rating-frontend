import { Component, OnInit } from '@angular/core';
import {DataStorageService} from "../../services/data-storage.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user: User;

  constructor(private dataStorageService: DataStorageService) {
    this.user = this.dataStorageService.getUser();
  }


  ngOnInit(): void {
  }

}
