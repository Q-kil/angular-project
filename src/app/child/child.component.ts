import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, OnChanges, DoCheck {
  @Input() old;
  @Output() sex = new EventEmitter();

  inputText = 111;

  constructor() { }

  ngOnChanges(e) {
    console.log('ngOnChanges', e);
  }

  ngOnInit(): void {
    console.log('old', this.old);
    this.sex.emit('boy');
  }

  ngDoCheck() {}
}
