import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarService} from "../_services/calendar.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {compareNumbers} from "@angular/compiler-cli/src/version_helpers";
import {UserService} from "../_services/user.service";
import {Recipe} from "../_models/recipe";
import {RecipeService} from "../_services/recipe.service";
import {AuthService} from "../_services/auth.service";
type EventTypeOrder = { [key: string]: number };
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit{
    calendarView: Date = new Date();
    constructor(private calendarService: CalendarService,
                private userService: UserService,
                private recipeService: RecipeService) {
    }
    events:any[] = [];
    favoriteList:number[] = [];
    planList:number[]=[];
    recipeList:any[] = [];
    ngOnInit(){
        this.calendarView = this.calendarService.getCalendarView();
        this.recipeService.recipeListInfo$.subscribe(res => {
            this.recipeList = res;
        });
        this.userService.getPlan().subscribe(res => {
            // this.events = res;
            this.events = [
                {date: new Date(this.calendarView), id: 4},
                {date: new Date(this.calendarView), id: 5},
            ];
            this.setSelectedDayEvents();
        });
        this.userService.getFav().subscribe(res => {
            // this.favoriteList = res;
            this.favoriteList = [1,2,3];
        })
    }
    getCalendarView():string{
        let date = this.calendarService.getCalendarView();
        if(!this.compareDates(this.calendarView, date)){
            this.calendarView = date;
            this.setSelectedDayEvents();
        }
        return this.calendarView.toDateString();
    }
    setSelectedDayEvents(){
        this.planList = this.events.filter(event => {
            return this.compareDates(event.date, this.calendarView);
        }).map(e => e.id);
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
    drop(event: CdkDragDrop<any[]>) {
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
    savePlan(){
        let list = this.events.filter(e => this.compareDates(e.date, this.calendarView)).map(e => e.id);

        let plan = this.planList.filter(item => !list.includes(item));
        for(let id of plan){
                this.events.push({
                    date: new Date(this.calendarView),
                    id: id,
                })
        }
    }
    getRecipeName(id: number){
        return this.recipeList.filter(e => id == e.id).map(e => e.title);
    }
}
