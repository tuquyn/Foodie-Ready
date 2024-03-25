import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Recipe} from "../_models/recipe";
import {RecipeService} from "../_services/recipe.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.css']
})
export class RecipeDialogComponent implements OnInit {
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
        this.authService.user$.subscribe(e => {
            if(e != null)
                this.authService.getFav(e.id).subscribe(res =>{
                    this.favList = res;
                })
        });
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
        }else{
            this.authService.user$.subscribe(e =>
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
    datePickerClosed() {
        if(this.selectedDate != "") {
            var newRecipe = {
                date: new Date(this.selectedDate).toISOString(),
                recipeId: this.recipe?.id,
                userId: "",
            }
            this.authService.user$.subscribe(e => {
                if(e != null){
                    newRecipe.userId = e.id;
                    this.authService.postPlan(newRecipe).subscribe((response: any) => {

                    })
                }
            })
        }
    }
}
