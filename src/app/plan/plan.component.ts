import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarService} from "../_services/calendar.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {compareNumbers} from "@angular/compiler-cli/src/version_helpers";
type EventTypeOrder = { [key: string]: number };
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit{
    calendarView: Date = new Date();
    constructor(private calendarService: CalendarService) {}
    events:any[] = [];
    selectedDayEvents: string[] = [];
    favoriteList: string[] = ['Cơm Tấm','Phở','Bún'];
    planList: string[] = [];
    ngOnInit(){
        this.calendarView = this.calendarService.getCalendarView();
        this.events = [
            {date: new Date(2024,0,1,), name: 'Bún Chả'},
            {date: new Date(2024,0,2,), name: 'Bún Thịt Nướng'},
        ]
        this.setSelectedDayEvents();
    }
    getCalendarView():string{
        if(this.calendarView != this.calendarService.getCalendarView()){
            this.calendarView = this.calendarService.getCalendarView();
            this.setSelectedDayEvents();
        }
        return this.calendarView.toDateString();
    }
    setSelectedDayEvents(){
        this.planList = this.events.filter(event => this.compareDates(event.date, this.calendarView)).map(event => event.name);
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
    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }
}
