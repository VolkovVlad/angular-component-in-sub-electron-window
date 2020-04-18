import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  // styleUrls: ['./child.component.css'] -- these styles will not work, cause angular inserts them in the main window
})
export class ChildComponent implements OnInit {
  @Output() increase = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
