import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {IdeaListComponent} from "./components/idea-list/idea-list.component";
import {IdeaDetailComponent} from "./components/idea-detail/idea-detail.component";
import {IdeaFormComponent} from "./components/idea-form/idea-form.component";
import {IdeaVoteFormComponent} from "./components/idea-vote-form/idea-vote-form.component";

const routes: Routes = [
  { path: ':username/ideas/:ideaId/vote', component: IdeaVoteFormComponent},
  { path: ':username/ideas/create', component: IdeaFormComponent},
  { path: ':username/ideas/:ideaId/update', component: IdeaFormComponent},
  { path: ':username/ideas/:ideaId', component: IdeaDetailComponent},
  { path: ':username/ideas', component: IdeaListComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
