import { Component, OnInit } from '@angular/core';
import {Idea} from "../../models/idea";
import {IdeaService} from "../../services/idea.service";
import {DataStorageService} from "../../services/data-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserVote} from "../../models/user-vote";
import {User} from "../../models/user";

@Component({
  selector: 'app-idea-vote-form',
  templateUrl: './idea-vote-form.component.html',
  styleUrls: ['./idea-vote-form.component.css']
})
export class IdeaVoteFormComponent implements OnInit {
  form: { [id: string] : string; } = {
    username: ""
  };
  public user: User = new User();
  public idea: Idea = new Idea();
  public sentenceVoteList: number[] = [];

  constructor(
    private ideaService: IdeaService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.dataStorageService.getUser();
    this.route.paramMap.subscribe( () => {
      this.getIdeaById();
    })
  }

  getIdeaById() {
    let ideaId: number = +this.route.snapshot.paramMap.get("ideaId")!;
    let username: string = this.route.snapshot.paramMap.get("username")!;
    this.ideaService.getByIdAndUsername(ideaId, username).subscribe(
      (data: Idea) => {
        this.idea = data;
      }
    );
  }

  onSentenceVoteChange(event: Event, sentenceId: number):void {
    if ((<HTMLInputElement>event.target).checked) {
      this.sentenceVoteList.push(sentenceId)
    } else {
      this.sentenceVoteList = this.sentenceVoteList.filter(id => id != sentenceId);
    }
  }

  sendVote(){
    let { username } = this.form;
    let userVote: UserVote = new UserVote();
    userVote.username = username;
    userVote.sentenceVoteIdList = this.sentenceVoteList;
    let ideaUsername = this.route.snapshot.paramMap.get("username")!;
    this.ideaService.voteIdea(
      ideaUsername, this.idea.id, userVote
    ).subscribe(
      (data) => {
        this.router.navigate([`/${username}/ideas`]);
      }
    )
  }

}
