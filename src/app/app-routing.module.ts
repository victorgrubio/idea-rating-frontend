import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {IdeaListComponent} from "./components/idea-list/idea-list.component";
import {IdeaDetailComponent} from "./components/idea-detail/idea-detail.component";

const routes: Routes = [
  { path: 'users/:username/ideas/:id', component: IdeaDetailComponent},
  { path: 'users/:username/ideas', component: IdeaListComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
