import { Component, OnInit } from '@angular/core';
import {Idea} from "../../models/idea";
import {IdeaService} from "../../services/idea.service";
import {DataStorageService} from "../../services/data-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {ClipboardService} from "ngx-clipboard";

@Component({
  selector: 'app-idea-detail',
  templateUrl: './idea-detail.component.html',
  styleUrls: ['./idea-detail.component.css']
})
export class IdeaDetailComponent implements OnInit {

  public user: any = {};
  public idea: Idea = new Idea();
  public href: string = "";

  constructor(
    private ideaService: IdeaService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private clipboardService: ClipboardService
  ) { }

  ngOnInit(): void {
    this.user = this.dataStorageService.getUser();
    this.href = this.router.url;
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

  copyVoteUrl(){
    let content: string = window.location.origin + `${this.href}/vote`
    console.log('Link ', content, ' copied to clipboard')
    this.clipboardService.copy(content)
    this.alertService.success('Link copied to clipboard!')
  }
}
