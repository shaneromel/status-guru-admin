import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {


  viewCommentsEvent:EventEmitter<any>=new EventEmitter();
  activateVideoEvent:EventEmitter<any>=new EventEmitter();
  deactivateVideoEvent:EventEmitter<any>=new EventEmitter();

  constructor() { }
}
