import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor() { }

  getComments(id){
    return firebase.firestore().collection(`videos/${id}/comments`).get();
  }

}
