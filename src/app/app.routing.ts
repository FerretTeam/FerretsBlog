import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleComponent } from '../component/article.component';
import { PersonComponent } from '../component/person.component';
import { AppComponent } from './app.component';

const appRouters: Routes = [
  {
    path:'',
    component: PersonComponent
  },
  {
    path:'article',
    component: ArticleComponent
  }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRouters);
