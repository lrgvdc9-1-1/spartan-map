import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-test-window',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @Input() attach_id: number = 0;
  @Input() items: any = null;
  @Input() files: any = ["test", 
"hello"];
  constructor() { }

  ngOnInit() {
  }

}
