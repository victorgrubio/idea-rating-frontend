import { Component, OnInit } from '@angular/core';
import {IdeaService} from "../../services/idea.service";
import {DataStorageService} from "../../services/data-storage.service";
import {Idea} from "../../models/ideas/idea";
import {User} from "../../models/ideas/user";

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.css']
})
export class IdeaListComponent implements OnInit {

  public user: User = new User();
  private currentIdea: Idea = new Idea();
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

  setCurrentIdea(idea: Idea){
    this.currentIdea = idea;
  }

  deleteCurrentIdea(){
    console.log('Deleting ', this.currentIdea)
    this.ideaService.delete(this.currentIdea.id).subscribe(
      this.processDeleteIdea(this.currentIdea.id)
    );
  }

  processIdeaList(){
    return (data: Idea[]) => {
      this.ideaList = data;
    }
  }

  private processDeleteIdea(ideaId: number) {
    return () => {
      this.ideaList = this.ideaList.filter(ideaArray => ideaArray.id !== ideaId);
    };
  }

  trackByIdea(index:number, idea:Idea): number {
    return idea.id;
  }
}
