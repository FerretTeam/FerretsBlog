import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarkdownModule } from 'angular2-markdown';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RoutingModule } from './app-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ArticleComponent } from './components/article/article.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { ArticleService } from './services/article/article.service';
import { AuthService } from './services/auth/auth.service';

// Define the routes

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    ArticleComponent,
    WelcomeComponent,
    LoginComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    MarkdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    FlexLayoutModule
  ],
  providers: [ArticleService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
