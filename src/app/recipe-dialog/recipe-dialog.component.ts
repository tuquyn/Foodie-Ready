import {AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Recipe} from "../_models/recipe";
import {RecipeService} from "../_services/recipe.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../_services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.css']
})
export class RecipeDialogComponent implements OnInit, OnDestroy  {
    private subscriptions: Subscription[] = [];

    @Input() recipe: Recipe | undefined;
    isLoggedIn$ = this.authService.isLoggedIn$;
    favList:any[] = [];
    selectedDate = "";
    chartOptions = {
        animationEnabled: true,
        title: {
            text: "Perception of Nutrition"
        },
        data: [{
            type: "doughnut",
            startAngle: -90,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###.##'%'",
            dataPoints: [
                { y: 22.53, name: "Carbs" },
                { y: 30.22, name: "Fat" },
                { y: 47.25, name: "Protein" },
            ]
        }]
    }
    displayedColumns = ['Name', 'Amount', 'Unit'];
    showTable: boolean = false;

    constructor(private recipeService: RecipeService,
        public dialogRef: MatDialogRef<RecipeDialogComponent>,
                public dialog: MatDialog,
                private _snackBar: MatSnackBar,
                private authService: AuthService,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onCancel() {
        this.dialogRef.close();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    ngOnInit() {
        this.recipe = this.data;
        if(this.recipe?.caloricBreakdown){
            this.chartOptions.data[0].dataPoints[0].y = this.recipe?.caloricBreakdown.percentCarbs;
            this.chartOptions.data[0].dataPoints[1].y = this.recipe?.caloricBreakdown.percentFat;
            this.chartOptions.data[0].dataPoints[2].y = this.recipe?.caloricBreakdown.percentProtein;
        }
        this.getFav();
    }
    getFav(){
        const sub = this.authService.user$.subscribe(e => {
            if(e != null)
                this.authService.getFav(e.id).subscribe(res =>{
                    this.favList = res;
                })
        });
        this.subscriptions.push(sub);
    }
    toggleTable(): void {
        this.showTable = !this.showTable;
    }
    isIdInList(id: any){
        return this.favList.map(e => e.recipeId).includes(id);
    }
    isIdInLikeList(id: any){
        return this.favList.filter(e => e.isDelete == false).map(e => e.recipeId).includes(id);
    }
    checkLike(id: any){
        if(this.isIdInList(id)){
            const sub =
            this.authService.user$.subscribe(e => {
                if(e!= null){
                    if(this.isIdInLikeList(id)) this.unlikeAction(); else this.likeAction();

                    let element = this.favList.find(f => f.recipeId == id);
                    this.authService.putFav({
                        id: element.id,
                        userId: element.userId,
                        isDelete: element.isDelete,
                        recipeId: element.recipeId,
                    }).subscribe(response => {
                        this.getFav();
                    })
                }
            })
            this.subscriptions.push(sub);

        }else{
            const sub = this.authService.user$.subscribe(e =>
            {
                if(e != null)
                    this.authService.postFav({
                        userId: e.id,
                        recipeId: id,
                    }).subscribe( response => {
                            this.getFav();
                            this.likeAction();
                        }
                    );
            })
            this.subscriptions.push(sub);

        }
    }
    likeAction(){
        this._snackBar.open("Like Successfully 🍕", "Close", {
            duration: 1000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
        });
    }
    unlikeAction(){
        this._snackBar.open("Unlike Successfully 🍕", "Close", {
            duration: 1000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
        });
    }
    planAction(){
        this._snackBar.open("Plan Successfully 🍕", "Close", {
            duration: 1000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
        });
    }
    datePickerClosed() {
        if(this.selectedDate != "") {
            var newRecipe = {
                date: new Date(this.selectedDate).toISOString(),
                recipeId: this.recipe?.id,
                userId: "",
            }
            const sub =
            this.authService.user$.subscribe(e => {
                if(e != null){
                    newRecipe.userId = e.id;
                    this.authService.postPlan(newRecipe).subscribe((response: any) => {
                        this.planAction();
                    })
                }
            })
            this.subscriptions.push(sub);

        }
    }
}
