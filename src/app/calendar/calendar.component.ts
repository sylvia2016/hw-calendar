import { DayComponent } from './../day/day.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild('day') day: DayComponent;

  weekNames: string[] = ['日', '一', '二', '三', '四', '五', '六',];
  today: Date = new Date();
  selectedDay: Date = new Date();
  views: Views;
  eventData: Event = new Event();

  constructor() { }

  ngOnInit() {
    this.getMonthViews();
  }



  /**組月曆 */
  getMonthViews() {
    let monthPeriodDate = this.calMonthStartAndEnd(new Date());
    this.views = this.getMonthView(monthPeriodDate.startDate, monthPeriodDate.endDate, this.today, this.selectedDay);
  }

  /**依開始結束時間取得月曆 */
  getMonthView(startDate: Date, endDate: Date, today: Date, selectedDay: Date) {
    let days: MonthViewDay[] = [],
      monthInDays: number = this.differenceInDays(startDate, endDate),//計算該月有多少天
      startYear: number = startDate.getFullYear(),//月曆開始年
      startMonth: number = startDate.getMonth(),  //月曆開始月
      startDateNumber: number = startDate.getDate(),//月曆開始日
      showToday: boolean = true,         //如果是當月，就要判斷是否為今天
      hasToday: boolean = false,         //如果是當月，且已經有今天，就不用再判斷
      isToday: boolean = false;          //判斷選擇日期是否為今天 

    //判斷是否要顯示今天      
    showToday = this.isSameMonth(today, selectedDay);
    //判斷選擇日期是否為今天
    if (showToday)
      isToday = this.isSameDay(today, selectedDay);

    //組資料
    for (let i = 0; i < monthInDays; i++) {
      let date: Date = new Date(startYear, startMonth, startDateNumber + i, 0, 0, 0),
        viewDay: MonthViewDay = {
          date: date,
          isToday: false,
          isChooseDay: false,
          isHoliday: false,
          isbadge: false,
          inMonth: false
        };;

      //判斷是否為當月
      viewDay.inMonth = this.isSameMonth(selectedDay, date);
      //判斷是否為今天
      if (showToday && !hasToday) {
        viewDay.isToday = this.isSameDay(date, today);
      }
      else
        viewDay.isToday = false;

      days.push(viewDay);
    }
    //計算月曆行數
    const ROWS: number = Math.floor(days.length / 7);
    let rowOffsets: number[] = [];
    for (let i = 0; i < ROWS; i++) {
      rowOffsets.push(i * 7);
    }

    return {
      title: selectedDay.getFullYear() + "/" + (selectedDay.getMonth() + 1),
      rowOffsets: rowOffsets,
      days: days
    };
  }

  /**判斷是否為同一個月 */
  isSameMonth(dateLeft: Date, dateRight: Date) {
    return dateLeft.getFullYear() === dateRight.getFullYear() && dateLeft.getMonth() === dateRight.getMonth();
  }

  /**判斷是否為同一天 */
  isSameDay(dateLeft: Date, dateRight: Date) {
    dateLeft.setHours(0, 0, 0, 0);
    dateRight.setHours(0, 0, 0, 0);
    return dateLeft.getTime() === dateRight.getTime();
  }

  /**取得兩個日期間所有天數 */
  differenceInDays(startDate: Date, endDate: Date) {
    let startDateMillsecond = startDate.getTime();
    let endDateMillsecond = endDate.getTime();
    if (startDateMillsecond - endDateMillsecond > 0) {
      return Math.abs((startDateMillsecond - endDateMillsecond) / 86400000) + 1;
    }
    else {
      return Math.abs((endDateMillsecond - startDateMillsecond) / 86400000) + 1;
    }
  }

  /**計算該日期的月曆開始時間即結束時間 */
  calMonthStartAndEnd(date: Date) {
    const YEAR = date.getFullYear();
    const MONTH = date.getMonth();
    let startDate = new Date(YEAR, MONTH, 1);
    let endDate = new Date(YEAR, MONTH + 1, 0);
    const START_DAY = startDate.getDay();
    const END_DAY = endDate.getDay();
    const END_DATE = endDate.getDate();
    startDate = START_DAY > 0 ? new Date(startDate.setDate(1 - START_DAY)) : startDate;
    endDate = END_DAY < 6 ? new Date(endDate.setDate(END_DATE + (6 - END_DAY))) : endDate;
    return { startDate, endDate };
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
