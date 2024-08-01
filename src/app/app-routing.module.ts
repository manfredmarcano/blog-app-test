import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { AuthGuard } from './services/auth-guard.service';

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
  {
    path: 'favorites',
    // component: NotFoundComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./routes/favorites/favorites.module').then(m => m.FavoritesModule),
  },
  // { path: '**', redirectTo: 'not-found' },
  { path: '**', redirectTo: 'favorites' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
