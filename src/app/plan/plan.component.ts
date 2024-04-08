import {Component, OnInit} from '@angular/core';
import {CalendarService} from "../_services/calendar.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {RecipeService} from "../_services/recipe.service";
import {AuthService} from "../_services/auth.service";
import {Favorite} from "../_models/user";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {LoginSheetComponent} from "../account/login-sheet/login-sheet.component";
import {Recipe} from "../_models/recipe";
import {RecipeDialogComponent} from "../recipe-dialog/recipe-dialog.component";
import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit{
    calendarView: Date = new Date();
    constructor(private calendarService: CalendarService,
                private recipeService: RecipeService,
                public dialog: MatDialog,
                private authService: AuthService,
                private _bottomSheet: MatBottomSheet,
                ) {
    }
    favList:Favorite[] = [];
    favoriteList:number[] = [];

    events:any[] = [];

    planList:number[]=[];
    recipeList:any[] = [];
    nutri = [];
    ngOnInit(){
        this.calendarService.calendarView$.subscribe(e => {
            this.calendarView = e;
            this.setSelectedDayEvents();
        })
        this.recipeService.recipeListInfo$.subscribe(res => {
            this.recipeList = res;
        });
        this.getFav();
    }
    getFav(){
        this.authService.user$.subscribe(e => {
            if(e != null){
                this.authService.getFav(e.id).subscribe(res =>{
                    this.favList = res.filter((element:any) => element.isDelete == false);
                    this.favoriteList = this.favList.map(e => e.recipeId);
                })
                this.authService.getPlan(e.id).subscribe(res => {
                    this.events = res;
                    this.events.forEach(t => t.date = new Date(t.date));
                    this.setSelectedDayEvents();
                })
            }else{
                this._bottomSheet.open(LoginSheetComponent);
            }
        });
    }
    getCalendarView(){
        return this.calendarView.toDateString();
    }
    setSelectedDayEvents(){
        this.planList = this.events.filter(event => {
            return this.compareDates(event.date, this.calendarView);
        }).map(e => e.recipeId);
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
        let list = this.events.filter(e => this.compareDates(e.date, this.calendarView)).map(e => e.recipeId);

        const elementCountMap: Map<number, number> = new Map();

        // Count occurrences of each element in the original array
        list.forEach((element) => {
            const count = elementCountMap.get(element) || 0;
            elementCountMap.set(element, count + 1);
        });

        let plan:number[] = [];
        // Compare the occurrences in the new array
        this.planList.forEach((element) => {
            const count = elementCountMap.get(element) || 0;

            if (count === 0) {
                plan.push(element);
            } else {
                elementCountMap.set(element, count - 1);
            }
        });
        let addList:any[] = [];
        for(let id of plan){
                addList.push({
                    date: this.calendarView.toISOString(),
                    recipeId: id,
                })
        }
        this.authService.user$.subscribe(e =>
        {
            if(e != null){
                addList.forEach(t => t.userId = e.id);
                this.authService.postListPlan(addList).subscribe( (response:any) => {
                    this.authService.getPlan(e.id).subscribe(res => {
                        this.events = res;
                        this.events.forEach(t => t.date = new Date(t.date));
                        this.setSelectedDayEvents();
                    })
                    }
                );
            }
        })
        this.getFav();
    }
    getRecipeName(id: number){
        return this.recipeList.filter(e => id == e.id).map(e => e.title);
    }
    getRecipe(id: number){
        let res = this.recipeList.filter(e => id == e.id)[0];
        let item = {
            id: res.id || null,
            name: res.title || '',
            description: res.summary || '',
            cookingTime: res.cookingMinutes || 0,
            preparationTime: res.preparationMinutes || 0,
            readyTime: res.readyInMinutes || 0,
            instruction: (res.analyzedInstructions && res.analyzedInstructions[0]?.steps) || [],
            nutrition: res.nutrition.nutrients,
            ingredient: res.extendedIngredients || [],
            image: res.image || '',
            servings: res.servings || 0,
            caloricBreakdown: res.nutrition.caloricBreakdown,
            dishTypes: res.dishTypes,
        }
        let dialogRef = this.dialog.open(RecipeDialogComponent, {
            width: '850px',
            height: '850px',
            data: item,
        });
            dialogRef.afterClosed().subscribe(result => {

            });
    }
    getNutrition(){
        for(let p of this.planList){
            let res = this.recipeList.find(e => p == e.id).nutrition.nutrients;
            console.log(res)
        }
    }
}
