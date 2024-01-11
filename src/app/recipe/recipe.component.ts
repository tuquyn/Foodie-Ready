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
    isLoggedIn$ = this.authService.isLoggedIn$;

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
        this.getFav();
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
    getFav(){
        this.authService.user$.subscribe(e => {
            if(e != null)
            this.authService.getFav(e.id).subscribe(res =>{
                this.favList = res;
            })
        });
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
}
