import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preview-ticket',
  templateUrl: './preview-ticket.component.html',
  styleUrls: ['./preview-ticket.component.css']
})
export class PreviewTicketComponent implements OnInit {

  @Input() ticket:any= null;
  doc: HTMLInputElement = null;
  constructor() { }

  ngOnInit() {
    //console.log(this.ticket)
  }

  onCopy(ele) {
    console.log(ele);
    this.doc = (<HTMLInputElement>document.getElementById(ele));
    console.log(this.doc.value)
    this.doc.disabled= false;
    this.doc.select();
    document.execCommand("copy");
    this.doc.disabled = true;

     /* Alert the copied text */
      //alert("Copied the text: " + copyText.value);
   
     }

}
