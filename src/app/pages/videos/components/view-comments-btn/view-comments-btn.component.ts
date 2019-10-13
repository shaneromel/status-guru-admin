import { Component, OnInit, Input } from '@angular/core';
import { CommunicationService } from '../../../../services/communication.service';

@Component({
  selector: 'ngx-view-comments-btn',
  templateUrl: './view-comments-btn.component.html',
  styleUrls: ['./view-comments-btn.component.scss']
})
export class ViewCommentsBtnComponent implements OnInit {
  @Input() rowData:any;

  constructor(private communicationService:CommunicationService) { }

  ngOnInit() {
  }

  viewComments(){
    this.communicationService.viewCommentsEvent.emit(this.rowData);
  }

}
