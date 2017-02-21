import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ArticleComponent } from './components/article/article.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';

const appRouters: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: ':user/home',
    component: HomeComponent
  },
  {
    path: ':user/profile',
    component: ProfileComponent
  },
  {
    path: ':user/article/:id',
    component: ArticleComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'login/:pageName',
    component: LoginComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRouters) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
