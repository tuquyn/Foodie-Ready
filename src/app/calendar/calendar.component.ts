import {Component, OnInit} from '@angular/core';
import {CalendarService} from "../_services/calendar.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
    calendarView = new Date();
    days : Date[]= [];
    constructor(private calendarService: CalendarService) {}
    ngOnInit() {
        this.buildCalendarDays();
        this.calendarView = this.calendarService.getCalendarView();
    }

    getCalendarView():string{
        return this.calendarView.toDateString();
    }

    buildCalendarDays() {
        this.days = this.getWeekRangeForEachDate(this.calendarView);
    }
    getFirstDayOfWeek(inputDate: Date):Date{
        const sundayDifference = 0 - inputDate.getDay(); // 0 represents Sunday
        const sundayOfCurrentWeek = new Date(inputDate);
        sundayOfCurrentWeek.setDate(inputDate.getDate() + sundayDifference);

        return sundayOfCurrentWeek;
    }
    getLastDayOfWeek(inputDate: Date):Date{
        const saturdayDifference = 6 - inputDate.getDay(); // 0 represents Sunday
        const saturdayOfCurrentWeek = new Date(inputDate);
        saturdayOfCurrentWeek.setDate(inputDate.getDate() + saturdayDifference);

        return saturdayOfCurrentWeek;
    }
    showOtherMonth(type: 'previous' | 'next') {
        if(type == 'previous') {
            this.calendarView.setDate(this.getFirstDayOfMonth(this.calendarView).getDate() - 1);
        }else{
            this.calendarView.setDate(this.getLastDayOfMonth(this.calendarView).getDate() + 1);
        }
        this.calendarService.setCalendarView(this.calendarView);
        this.buildCalendarDays();
    }

    getFirstDayOfMonth(date: Date):Date{
        return new Date(date.getFullYear(), date.getMonth(), 1);

    }
    getLastDayOfMonth(date: Date):Date{
        const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return new Date(nextMonth.getFullYear(), nextMonth.getMonth(), nextMonth.getDate());

    }
    getWeekRangeForEachDate(date: Date): Date[] {
        const result:Date[]= [];

        const startDate = this.getFirstDayOfMonth(date);
        const endDate = this.getLastDayOfMonth(date);

        for(let currentDate = this.getFirstDayOfWeek(startDate); currentDate <= this.getLastDayOfWeek(endDate); currentDate.setDate(currentDate.getDate() + 1)){
            result.push(new Date(currentDate));
        }
        return result;
    }

    isWeekend(date: Date):boolean{
        return new Date(date).getDay() === 0 || new Date(date).getDay() === 6;
    }
    isChoosing(date: Date):boolean{
        return this.compareDates(date, this.calendarView);
    }
    isDayFromOtherMonth(date: Date) {
        return new Date(date).getMonth() !== this.calendarView.getMonth();
    }
    compareDates(date1: Date, date2: Date): boolean {
        const time1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()).getTime();
        const time2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()).getTime();

        if (time1 != time2) {
            return false;
        }else{
            return true;
        }
    }
    changeChoosingDay(date: Date){
        if(date.getMonth() == this.calendarView.getMonth())
            this.calendarView = date;
        this.calendarService.setCalendarView(this.calendarView);
    }
}
