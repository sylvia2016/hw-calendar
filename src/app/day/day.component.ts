import { EventComponent } from './../event/event.component';
import { Component, ContentChild, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input()type: string;
  @Input()data: MonthViewDay[];
  @Input()eventData:Event;
  @ContentChild('event') event:EventComponent;

  constructor() { }

  ngOnInit() {
    
  }

}

class Views {
  title: string;
  rowOffsets: number[];
  days: MonthViewDay[];
}

class MonthViewDay {
  date: Date;
  isToday: boolean;
  isChooseDay: boolean;
  isHoliday: boolean;
  isbadge: boolean;
  inMonth: boolean;
}

class Event{
  date:Date;
  content: string;
  type: string;
}