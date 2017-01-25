import { ModuleWithProviders } from '@angular/core';

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../components/home.component';
import { ArticleComponent } from '../components/article.component';
import { ProfileComponent } from '../components/profile.component';
import { AppComponent } from './app.component';

const appRouters: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'article',
    component: ArticleComponent
  },
  {
    path:'profile',
    component: ProfileComponent
  }
];
// export const routing: ModuleWithProviders = RouterModule.forRoot(appRouters);
@NgModule({
  imports: [ RouterModule.forRoot(appRouters) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
