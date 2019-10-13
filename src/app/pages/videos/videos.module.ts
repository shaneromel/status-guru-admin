import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { UploadComponent } from './upload/upload.component';
import { NbCardModule, NbInputModule, NbButtonModule, NbProgressBarModule, NbDialogModule, NbListModule } from '@nebular/theme';

import { FilePondModule, registerPlugin } from 'ngx-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ManageComponent } from './manage/manage.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ViewCommentsBtnComponent } from './components/view-comments-btn/view-comments-btn.component';
registerPlugin(FilePondPluginFileValidateType);

@NgModule({
  declarations: [UploadComponent, ManageComponent, ViewCommentsBtnComponent],
  imports: [
    CommonModule,
    VideosRoutingModule,
    NbCardModule,
    NbInputModule,
    FilePondModule,
    FormsModule,
    NbButtonModule,
    AngularFireStorageModule,
    NbProgressBarModule,
    NbDialogModule,
    Ng2SmartTableModule,
    NbListModule
  ],
  entryComponents:[ViewCommentsBtnComponent]
})
export class VideosModule { }
