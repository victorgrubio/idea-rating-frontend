import { Component, OnInit } from '@angular/core';
import {Idea} from "../../models/idea";
import {IdeaService} from "../../services/idea.service";
import {DataStorageService} from "../../services/data-storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-idea-detail',
  templateUrl: './idea-detail.component.html',
  styleUrls: ['./idea-detail.component.css']
})
export class IdeaDetailComponent implements OnInit {

  public user: any = {};
  public idea: Idea = new Idea();

  constructor(
    private ideaService: IdeaService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute
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
}
