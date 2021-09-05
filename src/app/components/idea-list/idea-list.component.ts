import { Component, OnInit } from '@angular/core';
import {IdeaService} from "../../services/idea.service";
import {DataStorageService} from "../../services/data-storage.service";
import {Idea} from "../../models/idea";

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.css']
})
export class IdeaListComponent implements OnInit {

  public user: any = {};
  public ideaList: Idea[] = [];

  constructor(
    private ideaService: IdeaService,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit(): void {
    this.user = this.dataStorageService.getUser();
    this.listUserIdeas(this.user.username);
  }

  listUserIdeas(username: string) {
    this.ideaService.listUserIdeas(username).subscribe(
      this.processIdeaList()
    );
  }

  processIdeaList(){
    return (data: Idea[]) => {
      this.ideaList = data;
    }
  }



}
