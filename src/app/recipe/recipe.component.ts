import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../_services/recipe.service";
import {Recipe} from "../_models/recipe";
import {RecipeDialogComponent} from "../recipe-dialog/recipe-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit{
    dataSource: Recipe[];
    constructor(private recipeService: RecipeService,
                public dialog: MatDialog,
                ) {
        this.dataSource = [];
    }
    ngOnInit(){
        this.recipeService.getRecipeListInfo().subscribe(res =>{
            for (let e of res) {
                this.setNewRecipe(e);
            }
        })
    }
    setNewRecipe(res: any){
        let newRecipe: Recipe = {
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
        return combinedString.slice(0, 50) + (combinedString.length > 50 ? '...': '');
    }
}
