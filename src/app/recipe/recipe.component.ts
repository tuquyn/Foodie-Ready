import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../_services/recipe.service";
import {Recipe} from "../_models/recipe";
import {RecipeDialogComponent} from "../recipe-dialog/recipe-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../_services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl} from "@angular/forms";
import {MatChip} from "@angular/material/chips";
import _default from "chart.js/dist/core/core.interaction";
import index = _default.modes.index;
import {filter} from "rxjs";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit{
    isLoggedIn$ = this.authService.isLoggedIn$;

    dataSource: Recipe[];
    dataSourceFilter: Recipe[];
    recipeIdList:any[] = [];
    favList:any[] = [];
    color = "";
    shapeClass: string = 'square';
    filter: string[] = [];
    filter2: string[] = [];
    selectedOptions: string[] = [];
    selectedOptions2: string[] = [];
    constructor(private recipeService: RecipeService,
                public dialog: MatDialog,
                private _snackBar: MatSnackBar,
                private authService: AuthService,
                ) {
        this.dataSource = [];
        this.dataSourceFilter = [];
    }
    ngOnInit(){
        this.recipeService.recipeListInfo$.subscribe(res =>{
            for (let e of res) {
                this.setNewRecipe(e);
            }
            this.dataSourceFilter = this.dataSource;
            this.getOptions();
        })
        this.getFav();
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
        this.filter = this.filter.concat(newRecipe.dishTypes);
        this.filter2 = this.filter2.concat(newRecipe.ingredient.map(e => e['aisle']));
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
        return combinedString.slice(0, 30) + (combinedString.length > 30 ? '...': '');
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

    changeShape(shape: string) {
        this.shapeClass = shape;
        this.color = "white";
    }

    changeColor(color: string){
        this.color = color;
    }
    getOptions(){
        this.filter = this.filter.filter((value, index, self) => self.indexOf(value) === index);
        this.filter2 = this.filter2.filter((value, index, self) => self.indexOf(value) === index);
    }
    getFilter() {
        if(this.selectedOptions.length == 0) this.selectedOptions = this.filter;
        if(this.selectedOptions2.length == 0) this.selectedOptions2 = this.filter2;
        this.dataSourceFilter = this.dataSource.filter(item => {
            return this.selectedOptions.some(filter => {
                return item.dishTypes.includes(filter);
            }) &&
                this.selectedOptions2.some(filter => item.ingredient.map(e => e['aisle']).includes(filter));
        });
    }
}
