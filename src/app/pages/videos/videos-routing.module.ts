import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  {
    path:"upload", component:UploadComponent
  },
  {
    path:"manage", component:ManageComponent
  },
  {
    path:"", redirectTo:"manage", pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
