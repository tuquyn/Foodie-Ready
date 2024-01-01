import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
    private calendarViewSubject = new BehaviorSubject<Date>(new Date());
    calendarView$: Observable<Date> = this.calendarViewSubject.asObservable();

    setCalendarView(calendarView: Date) {
        this.calendarViewSubject.next(calendarView);
    }

    getCalendarView(): Date {
        return this.calendarViewSubject.value;
    }
}
