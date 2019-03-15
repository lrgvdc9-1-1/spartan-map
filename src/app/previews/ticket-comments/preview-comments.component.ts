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
  object: COMMENT = {ticket_comments: ""};
  loading: boolean = false;
  constructor(private service:HttpService) { }

  ngOnInit() {
      this.getComments();
    
  }


  getComments() {
    this.service.getComments(this.ticketNumber).subscribe((response: Array<COMMENT>) => { 
      
      response.forEach((data:COMMENT) => {
         if(parseInt(data.time_track_int) > 0) {
           console.log(data.time_track_int);
           let date = new Date(parseInt(data.time_track_int));
           data.time_stamp = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + this.formatAMPM(date);
         }
      })
      this.loading = false;
      this.comments = response;
    });
  }


  //Format time am to pm...
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0'+hours : hours; // this for hours not to be single digit...
    minutes = minutes < 10 ? '0'+minutes : minutes;
    
    var strTime = hours + ':' + minutes +  ampm;
    return strTime;
  }

  //Add new Comment to the database..
  onSubmit() {
    this.loading = true;
    var today = new Date();
   
    this.object.bwtime = today.getTime();
    this.object.first_name = "HECTOR";
    this.object.last_name = "CHAPA";
    this.object.ticket_number = this.ticketNumber;
    this.object.user_id = 3;

    this.service.insertComment(this.object).subscribe((response) => {
        
      this.object.ticket_comments = "";
      this.getComments();
     
    });

  }

}
