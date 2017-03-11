import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HomeComponent, HomeDialog } from './components/home/home.component';
import { RoutingModule } from './app-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ArticleComponent } from './components/article/article.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { EditComponent } from './components/edit/edit.component';

import { ArticleService } from './services/article/article.service';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    ArticleComponent,
    WelcomeComponent,
    LoginComponent,
    EditComponent,
    HomeDialog
  ],
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    FlexLayoutModule
  ],
  entryComponents: [HomeDialog],
  providers: [ArticleService, AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
