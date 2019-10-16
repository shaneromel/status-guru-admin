import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';
import { VideoService } from '../../../services/video.service';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'ngx-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @ViewChild("videoUploadProgress", {static:false}) videoProgressDialog;
  @ViewChild("thumbnailUploadProgress", {static:false}) thumbnailProgressDialog;
  
  videoProgressDialogRef;
  thumbnailProgressDialogRef;

  videoPondOptions = {
    multiple: false,
    labelIdle: 'Drop video here',
    acceptedFileTypes:"video/mp4,video/x-m4v,video/*"
  }

  thumbnailPondOptions={
    multiple:false,
    labelIdle:"Drop thumbnail here",
    acceptedFileTypes: 'image/jpeg, image/png'
  }
  
  thumbnail:any;
  video:any;
  videoUploadPercentage:number;
  thumbnailUploadPercentage:number;
  videoUrl:string;
  thumbnailUrl:string;
  videoUploadStatus:string;
  thumbnailUploadStatus:string;

  videoUploadTask;
  thumbnailUploadTask;

  title:string;
  description:string;

  constructor(private storage: AngularFireStorage, private dialogService:NbDialogService, private videoService:VideoService, private toastrService:ToastrService) { 
    this.videoUploadStatus="primary";
    this.thumbnailUploadStatus="primary";
  }

  ngOnInit() {
  }

  videoSelected(event){
    console.log(event);
    this.video=event.file.file;
  }

  thumbnailSelected(event){
    console.log(event);
    this.thumbnail=event.file.file;
  }

  uploadVideo(event) {
    return new Promise((resolve, reject)=>{
      this.videoProgressDialogRef=this.dialogService.open(this.videoProgressDialog, {hasBackdrop:false});
      const file = event;
      const filePath = `videos/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      this.videoUploadTask = this.storage.upload(filePath, file);

      // observe percentage changes
      this.videoUploadTask.percentageChanges().subscribe(percentage=>{
        this.videoUploadPercentage=percentage;
      })
      // get notified when the download URL is available
      this.videoUploadTask.snapshotChanges().pipe(
          finalize(() =>{
            fileRef.getDownloadURL().subscribe(url=>{
              this.videoUrl=url;
              console.log(url);
              this.videoUploadStatus="success";
              this.videoProgressDialogRef.close();
              resolve();
            })
          } )
      )
      .subscribe()
      })
  }

  uploadThumbnail(event) {
    return new Promise((resolve, reject)=>{
      this.thumbnailProgressDialogRef=this.dialogService.open(this.thumbnailProgressDialog, {hasBackdrop:false});
      const file = event;
      const filePath = `thumbnail/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      this.thumbnailUploadTask= this.storage.upload(filePath, file);

      // observe percentage changes
      this.thumbnailUploadTask.percentageChanges().subscribe(percentage=>{
        this.thumbnailUploadPercentage=percentage;
      })
      // get notified when the download URL is available
      this.thumbnailUploadTask.snapshotChanges().pipe(
          finalize(() =>{
            fileRef.getDownloadURL().subscribe(url=>{
              this.thumbnailUrl=url;
              this.thumbnailUploadStatus="success";
              this.thumbnailProgressDialogRef.close();
              resolve();
            })
          } )
      )
      .subscribe()
    })
  }

  cancelVideoUpload(){
    this.videoUploadTask.cancel();
    this.videoProgressDialogRef.close();
    this.videoUploadPercentage=0;
  }

  cancelThumbnailUpload(){
    this.thumbnailUploadTask.cancel();
    this.thumbnailProgressDialogRef.cancel();
    this.thumbnailUploadPercentage=0;
  }

  submitVideo(){
    this.uploadVideo(this.video).then(res=>{
      console.log("video uploaded", res)
      if(this.thumbnail){
        this.uploadThumbnail(this.thumbnail).then(()=>{
          const data={
            title:this.title,
            description:this.description,
            video:this.videoUrl,
            thumbnail:this.thumbnailUrl,
            is_active:true,
            likes:0,
            comments:0,
            timestamp:Date.now()
          };

          this.videoService.uploadVideo(data).then(()=>{
            this.toastrService.showToast("success", "Success", "Video successfully uploaded");
          }).catch(err=>{
            this.toastrService.showToast("danger", "Error", err.message);
          })

        }).catch(err=>{
          this.toastrService.showToast("danger", "Error", err.message);
        })
      }else{
        const data={
          title:this.title,
          description:this.description,
          video:this.videoUrl,
          is_active:true,
          likes:0,
          comments:0,
          timestamp:Date.now()
        };

        this.videoService.uploadVideo(data).then(()=>{
          this.toastrService.showToast("success", "Success", "Video successfully uploaded");
        }).catch(err=>{
          this.toastrService.showToast("danger", "Error", err.message);
        })
      }
    })
  }

}
