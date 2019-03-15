import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { COMMENT } from 'src/app/model/interface';


@Component({
  selector: 'app-preview-ticket-comments',
  templateUrl: './preview-comments.component.html',
  styleUrls: ['./preview-comments.component.css']
})
export class PreviewTicketCommentsComponent implements OnInit {
  @Input() ticketNumber: number = 0;
  @Input() onEdit: boolean = false;

  comments:Array<COMMENT> = []; 
  message: string = "";

  constructor(private service:HttpService) { }

  ngOnInit() {

    this.service.getComments(this.ticketNumber).subscribe((response: Array<COMMENT>) => {
      console.log(response);
      
      this.comments = response;
    });
  }

}
