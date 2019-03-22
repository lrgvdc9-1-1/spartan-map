import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  @Input() message: string = "Message is inserted here"
  @Input() btnAccept: string = "Button Title";
  @Input() btnDisagree: string = "Button Title";
  @Output() action = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  onAccept() {
    this.action.emit(true);
  }

  onDeny() {
    this.action.emit(false);
  }

}
