import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource, Cell } from 'ng2-smart-table';
import { VideoService } from '../../../services/video.service';
import { ToastrService } from '../../../services/toastr.service';
import { ViewCommentsBtnComponent } from '../components/view-comments-btn/view-comments-btn.component';
import { CommunicationService } from '../../../services/communication.service';
import { CommentService } from '../../../services/comment.service';
import { Subscription } from 'rxjs';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  @ViewChild("commentList", {static:false}) commentListDialog;

  commentListDialogRef;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      thumbnail:{
        title:"Thumbnail",
        type:"html",
        valuePrepareFunction:(cell, row)=>{
          if(!cell){
            cell="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSNjmWT2aNaokEue_MdYDL_Hx84Xnsn6HHlGT8E7nupRuy8b-dN";
          }
          return `<img src="${cell}" height="100px" width="100px">`
        },
        filter:false
      },
      title: {
        title: 'Title',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      likes: {
        title: 'Likes',
        type: 'number',
      },
      comments: {
        title: 'Comments',
        type: 'number',
      },
      play:{
        title:"Play",
        type:"html",
        valuePrepareFunction:(cell, row)=>{
          return `<a href="${row.video}" target="blank" type="button" class="btn">Play</a>`
        },
        filter:false
      },
      view_comments:{
        title:"View comments",
        type:"custom",
        renderComponent:ViewCommentsBtnComponent,
        filter:false
      }
    },
    actions:{
      edit:false,
      add:false
    }
  };

  source: LocalDataSource = new LocalDataSource();
  comments:any[];
  viewCommentsSubscription:Subscription;

  constructor(private videoService:VideoService, private toastrService:ToastrService, private communicationService:CommunicationService, private commentService:CommentService, private dialogService:NbDialogService) { }

  ngOnInit() {
    this.videoService.getVideos().then(docs=>{
      docs.forEach(a=>{
        let d=a.data() as any;
        d.id=a.id;
        this.source.append(d);
      })
    })

    this.viewCommentsSubscription=this.communicationService.viewCommentsEvent.subscribe(data=>{
      this.commentService.getComments(data.id).then(comments=>{
        this.comments=[];

        comments.forEach(a=>{
          this.comments.push(a.data());
        })

        this.commentListDialogRef=this.dialogService.open(this.commentListDialog);

      }).catch(err=>{
        this.toastrService.showToast("danger", "Error", err.message);
      })
    })

  }

  deleteVideo(event){
    if(window.confirm("Are you sure you want to delete this video?")){
      this.videoService.deleteVideo(event.data.id).then(()=>{
        this.toastrService.showToast("success", "Success", "Video successfully deleted");
        event.confirm.resolve();
      }).catch(err=>{
        this.toastrService.showToast("danger", "Error", err.message);
        event.confirm.reject();
      })
    }
  }

  ngOnDestroy(){
    if(this.viewCommentsSubscription){
      this.viewCommentsSubscription.unsubscribe();
    }
  }

}
