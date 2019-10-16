import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private db:AngularFirestore) { }

  uploadVideo(data){
    return this.db.collection("videos").add(data);
  }

  getVideos(){
    return firebase.firestore().collection("videos").get();
  }

  deleteVideo(id){
    return this.db.doc(`videos/${id}`).delete();
  }

  activate(id){
    return this.db.doc(`videos/${id}`).update({is_active:true});
  }

  deactivate(id){
    return this.db.doc(`videos/${id}`).update({is_active:false});
  }

}
