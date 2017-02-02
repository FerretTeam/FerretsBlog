import { ModuleWithProviders } from '@angular/core';

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { HomeComponent } from '../components/home.component';
// import { ArticleComponent } from '../components/article.component';
// import { ProfileComponent } from '../components/profile.component';
// import { AppComponent } from './app.component';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const appRouters: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  }
];
// export const routing: ModuleWithProviders = RouterModule.forRoot(appRouters);
@NgModule({
  imports: [ RouterModule.forRoot(appRouters) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
