import { Component, OnInit } from '@angular/core';
import {Idea} from "../../models/ideas/idea";
import {IdeaService} from "../../services/idea.service";
import {DataStorageService} from "../../services/data-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ClipboardService} from "ngx-clipboard";
import {User} from "../../models/ideas/user";

@Component({
  selector: 'app-idea-detail',
  templateUrl: './idea-detail.component.html',
  styleUrls: ['./idea-detail.component.css']
})
export class IdeaDetailComponent implements OnInit {

  public user: User = new User();
  public idea: Idea = new Idea();
  public href: string = "";
  public showShareModal: boolean = false;

  constructor(
    private ideaService: IdeaService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router,
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
    let no_modal_content: string = content.replace("#my-modal", "")
    console.log('Link ', no_modal_content, ' copied to clipboard')
    this.clipboardService.copy(no_modal_content)
    this.changeModalStatus();
  }

  changeModalStatus(){
    this.showShareModal = !this.showShareModal;
  }
}
