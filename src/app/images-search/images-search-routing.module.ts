import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImagesSearchPageComponent } from './containers/images-search-page/images-search-page.component';

const routes: Routes = [
  {
    path: '',
    component: ImagesSearchPageComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesSearchRoutingModule {}
