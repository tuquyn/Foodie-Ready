import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../_services/recipe.service";
import {Recipe} from "../_models/recipe";
import {RecipeDialogComponent} from "../recipe-dialog/recipe-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../_services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit{
    dataSource: Recipe[];
    recipeIdList:any[] = [];
    favList:any[] = [];
    constructor(private recipeService: RecipeService,
                public dialog: MatDialog,
                private _snackBar: MatSnackBar,
                private authService: AuthService,
                ) {
        this.dataSource= [];
    }
    ngOnInit(){
        this.recipeService.recipeList$.subscribe(res => {
            this.recipeIdList = res;
        })
        this.recipeService.recipeListInfo$.subscribe(res =>{
            for (let e of res) {
                this.setNewRecipe(e);
            }
        })
        this.authService.favList$.subscribe(res =>{
            this.favList = res;
        })
    }
    setNewRecipe(res: any){
        let e = this.recipeIdList.find((e:any) => e.spoonacularId == res.id);
        let newRecipe: Recipe = {
            id: e?.id || res.id || null,
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
        this.dataSource.push(newRecipe);
    }
    openDialog(item: Recipe){
        let dialogRef = this.dialog.open(RecipeDialogComponent, {
            width: '800px',
            height: '600px',
            data: item,
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }
    transform(item : string[]): string {
        let combinedString = item.join(', ');
        return combinedString.slice(0, 70) + (combinedString.length > 70 ? '...': '');
    }
    isIdInList(id: any){
        return this.favList.includes(id);
    }
    successAction(){
        this._snackBar.open("Like Successfully", "Close", {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
        });
    }
    failAction(){
        this._snackBar.open("Unlike Successfully", "Close", {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
        });
    }
}
