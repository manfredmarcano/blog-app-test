import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

export const ARTICLES: string = 'articles';
export const FAVORITES: string = 'favorites';

const routes: Routes = [
  {
    path: '',
    redirectTo: ARTICLES,
    pathMatch: 'full',
  },
  {
    path: ARTICLES,
    loadChildren: () =>
      import('./routes/articles/articles.module').then(m => m.ArticlesModule),
  },
  {
    path: FAVORITES,
    // component: NotFoundComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./routes/favorites/favorites.module').then(m => m.FavoritesModule),
  },
  // { path: '**', redirectTo: 'not-found' },
  { path: '**', redirectTo: FAVORITES },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
