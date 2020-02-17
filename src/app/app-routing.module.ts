import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'images-search',
    loadChildren: () =>
      import('./images-search/images-search.module').then(
        mod => mod.ImagesSearchModule
      )
  },
  {
    path: '**',
    redirectTo: 'images-search'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
