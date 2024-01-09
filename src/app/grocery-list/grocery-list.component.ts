import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../_services/user.service";
import {RecipeService} from "../_services/recipe.service";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit{
    ingredientList : any[] = [];
    recipeList:any[] = [];
    listCart:any[] = [];
    allComplete: boolean = false;
    displayedColumns: string[] = ['id', 'name', 'quantity', 'unit'];
    dataSource!: MatTableDataSource<any>;
    constructor(private userService: UserService,
                private recipeService: RecipeService) {
    }
    ngOnInit(){
        this.recipeService.recipeListInfo$.subscribe(res => {
            this.recipeList = res;
        });
        this.userService.getCart().subscribe(res => {
            this.listCart = [
                {id: 1, selected: false},
                {id: 2, selected: false},
                {id: 3, selected: false},
            ];
        });
        this.setIngredientList();
    }
    setIngredientList(){
        let list = this.listCart.filter(element => element.selected === true).map(e => e.id);
        this.ingredientList = [];

        for(let id of list)
        {
            let listIngredient = this.recipeList.filter(e => e.id == id).map(e => e.extendedIngredients)[0];
            console.log(listIngredient)
            for(let e of listIngredient){
                let index = this.ingredientList.findIndex(f => f.id == e.id && f.unit == e.unit);
                if(index == -1){
                    this.ingredientList.push({
                        id: e.id,
                        name: e.name,
                        quantity: e.amount,
                        unit: e.unit,
                    });
                }else{
                    this.ingredientList[index].amount += e.amount;
                }
            }
        }
        this.ingredientList = this.ingredientList.sort(e => e.name);
        this.updateDataSource();
    }
    someComplete(){
        if (this.listCart == null) {
            return false;
        }
        return this.listCart.filter(t => t.selected).length > 0 && !this.allComplete;
    }
    setAll(completed: boolean){
        this.allComplete = completed;
        if (this.listCart == null) {
            return;
        }
        this.listCart.forEach(t => (t.selected = completed));
        this.setIngredientList();
    }
    updateSelect(){
        this.allComplete = this.listCart.filter(t => t.selected === true).length === this.listCart.length;
        this.setIngredientList();
    }
    updateDataSource(){
        this.dataSource = new MatTableDataSource(this.ingredientList)
    }
    getRecipeName(id: number){
        return this.recipeList.filter(e => id == e.id).map(e => e.title);
    }
}
