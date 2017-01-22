import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../component/home.component';
import { ArticleComponent } from '../component/article.component';
import { PersonComponent } from '../component/person.component';
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
    path:'person',
    component: PersonComponent
  }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRouters);
