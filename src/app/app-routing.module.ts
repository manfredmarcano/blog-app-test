import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './routes/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'articles',
    pathMatch: 'full',
  },
  {
    path: 'articles',
    loadChildren: () =>
      import('./routes/articles/articles.module').then(m => m.ArticlesModule),
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbCollapseModule], // { enableTracing: true }
  exports: [RouterModule]
})
export class AppRoutingModule { }
