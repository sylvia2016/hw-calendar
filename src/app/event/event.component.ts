import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  eventData: Event;

  constructor() { }

  ngOnInit() {
  }

}

class Event {
  date: Date;
  content: string;
  type: string;
}