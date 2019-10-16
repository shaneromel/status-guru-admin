import { Component, OnInit, Input } from '@angular/core';
import { CommunicationService } from '../../../../services/communication.service';

@Component({
  selector: 'ngx-activate-deactivate',
  templateUrl: './activate-deactivate.component.html',
  styleUrls: ['./activate-deactivate.component.scss']
})
export class ActivateDeactivateComponent implements OnInit {
  @Input() rowData:any;

  constructor(private communicationService:CommunicationService) { }

  ngOnInit() {
  }

  activate(){
    this.communicationService.activateVideoEvent.emit(this.rowData);
  }

  deactivate1(){
    this.communicationService.deactivateVideoEvent.emit(this.rowData);
  }































































    
























}
