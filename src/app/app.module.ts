import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdeaDetailComponent } from './components/idea-detail/idea-detail.component';
import { IdeaListComponent } from './components/idea-list/idea-list.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { IdeaFormComponent } from './components/idea-form/idea-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {ClipboardModule} from "ngx-clipboard";
import { IdeaVoteFormComponent } from './components/idea-vote-form/idea-vote-form.component';

@NgModule({
  declarations: [
    AppComponent,
    IdeaDetailComponent,
    IdeaListComponent,
    LoginComponent,
    IdeaFormComponent,
    NavbarComponent,
    IdeaVoteFormComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ClipboardModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
