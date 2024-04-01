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
    user = null;

    dataSource: Recipe[];
    dataSourceFilter: Recipe[];
    favList:any[] = [];
    color = "";
    shapeClass: string = 'square';
    filter: string[] = [];
    filter2: string[] = [];
    selectedOptions: string[] = [];
    selectedOptions2: string[] = [];

    all: boolean = true;
    none: boolean = false;
    search: boolean = false;

    styles = {};
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
        this.authService.user$.subscribe(e => {
            this.user = e;
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
            width: '850px',
            height: '850px',
            data: item,
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }
    getFav(){
        this.authService.user$.subscribe(e => {
            if(e != null)
            this.authService.getFav(e.id).subscribe(res =>{
                this.favList = res;
            })
        });
    }

    changeShape(shape: string) {
        this.shapeClass = shape;
        this.updateStyle();
    }

    changeColor(color: string){
        this.color = color;
        this.updateStyle();
    }
    getOptions(){
        this.filter = this.filter.filter((value, index, self) => self.indexOf(value) === index);
        this.filter2 = this.filter2.filter((value, index, self) => self.indexOf(value) === index);
    }
    getFilter() {
        // if(this.selectedOptions.length == 0) this.selectedOptions = this.filter;
        // if(this.selectedOptions2.length == 0) this.selectedOptions2 = this.filter2;
        this.dataSourceFilter = this.dataSource.filter(item => {
            return this.selectedOptions.some(filter => {
                return item.dishTypes.includes(filter);
            }) &&
                this.selectedOptions2.some(filter => item.ingredient.map(e => e['aisle']).includes(filter));
        });
    }

    selectQuickly(){
        if(this.all){
            this.selectedOptions = this.filter;
            this.selectedOptions2 = this.filter2;
        }
        if(this.none){
            this.selectedOptions2 = [];
            this.selectedOptions = [];
        }
        this.all = !this.all;
        this.none = !this.none;
    }

    updateStyle(){
        this.styles = {
            'background-color': this.color == 'white' ? '#FFFFFF' : '#3D3D3D',
            'color': this.color == 'white' ? '#553434' : '#FFFFFF',
            'clip-path': this.shapeClass == 'square' ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'inset(3px 3px 3px round 15px)'
        }
    }
}
