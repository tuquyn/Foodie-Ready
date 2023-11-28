import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
type EventTypeOrder = { [key: string]: number };
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit{
    @Input() selectedDate: Date = new Date();
    @Input() events: Event[] = [];
    @Output() dayClick = new EventEmitter<Date>();
    selectedDayEvents: Event[] = [];
    isAddingNewItem: boolean = false; // Flag to track if adding a new item

    onSelect(event: any){
        this.isAddingNewItem = false;
        this.selectedDate = event;
        this.selectedDayEvents = this.events.filter(
            event =>
                (event.startTime.toDateString() === this.selectedDate.toDateString())
        )
    }
    ngOnInit(){
        this.events = [
            {title: 'Cơm Tấm', type: 'breakfast', startTime: new Date(2023, 10, 15), endTime: new Date(2023, 10, 15)},
            {title: 'Phở', type: 'lunch', startTime: new Date(2023, 10, 15), endTime: new Date(2023, 10, 15)},
            {title: 'Lẩu Thái', type: 'dinner', startTime: new Date(2023, 10, 15), endTime: new Date(2023, 10, 15)},
            // Add more events as needed
        ];
    }
    sortedDayEvents(): Event[] {
        const typeOrder: EventTypeOrder = { breakfast: 1, lunch: 2, dinner: 3 };
        // Filter out events with undefined or unknown types
        const filteredEvents = this.selectedDayEvents.filter(event => typeOrder.hasOwnProperty(event.type));

        // Sort events
        return filteredEvents.sort((a, b) => typeOrder[a.type] - typeOrder[b.type]);
    }
    startAddingNewItem() {
        this.isAddingNewItem = true;
    }

    cancelAddingNewItem() {
        this.isAddingNewItem = false;
    }

    saveNewItem() {
        this.isAddingNewItem = false;
    }
}
export interface Event{
    title: string,
    type: string,
    startTime: Date,
    endTime: Date,
}
