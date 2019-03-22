import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  @Input() title: string = "Are you sure?";
  @Input() message: string = "Message is inserted here"
  @Input() btnAccept: string = "Button Title";
  @Input() btnDisagree: string = "Button Title";
  @Input() display:boolean = false;
  @Output() action = new EventEmitter<boolean>();
  
  act:boolean = null;
  constructor() { }

  ngOnInit() {
  }

  

  onAccept() {
    this.act = true;
    this.action.emit(true);
    
  }

  onDeny() {
   
    this.act = false;
    this.action.emit(false);
  }

}
