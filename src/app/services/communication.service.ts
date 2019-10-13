import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {


  viewCommentsEvent:EventEmitter<any>=new EventEmitter();

  constructor() { }
}
