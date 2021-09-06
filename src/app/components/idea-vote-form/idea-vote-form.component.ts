import { Component, OnInit } from '@angular/core';
import {Idea} from "../../models/idea";
import {IdeaService} from "../../services/idea.service";
import {DataStorageService} from "../../services/data-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {UserVote} from "../../models/user-vote";

@Component({
  selector: 'app-idea-vote-form',
  templateUrl: './idea-vote-form.component.html',
  styleUrls: ['./idea-vote-form.component.css']
})
export class IdeaVoteFormComponent implements OnInit {
  form: any = {
    username: null
  };
  public user: any = {};
  public idea: Idea = new Idea();
  public sentenceVoteList: number[] = [];

  constructor(
    private ideaService: IdeaService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.user = this.dataStorageService.getUser();
    this.route.paramMap.subscribe( () => {
      this.getIdeaById();
    })
  }

  getIdeaById() {
    let ideaId: number = +this.route.snapshot.paramMap.get("ideaId")!;
    this.ideaService.getById(ideaId).subscribe(
      (data: Idea) => {
        this.idea = data;
      }
    );
  }

  onSentenceVoteChange(values:any, sentenceId: number):void {
    if (values.currentTarget.checked) {
      this.sentenceVoteList.push(sentenceId)
    } else {
      let index = this.sentenceVoteList.indexOf(sentenceId);
      if (index !== -1) {
        this.sentenceVoteList.slice(index, 1);
      }
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
