import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
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
    cartList:any[] = [];
    allComplete: boolean = false;
    displayedColumns: string[] = ['id', 'name', 'quantity', 'unit'];
    dataSource!: MatTableDataSource<any>;
    constructor(private authService: AuthService,
                private recipeService: RecipeService) {
    }
    ngOnInit(){
        this.recipeService.recipeListInfo$.subscribe(res => {
            this.recipeList = res;
        });
        this.getCart();
        this.setIngredientList();
    }
    getCart(){
        this.authService.user$.subscribe(e => {
            if(e != null)
                this.authService.getFav(e.id).subscribe(res =>{
                    this.cartList = res.filter((element:any) => element.isDelete == false);
                    this.cartList.forEach((item) => {
                        item['selected'] = false;
                    });
                })
        });
    }
    setIngredientList(){
        let list = this.cartList.filter(element => element.selected === true).map(e => e.recipeId);
        this.ingredientList = [];
        for(let id of list)
        {
            let listIngredient = this.recipeList.filter(e => e.id == id).map(e => e.extendedIngredients)[0];
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
        if (this.cartList == null) {
            return false;
        }
        return this.cartList.filter(t => t.selected == true).length > 0 && !this.allComplete;
    }
    setAll(completed: boolean){
        this.allComplete = completed;
        if (this.cartList == null) {
            return;
        }
        this.cartList.forEach(t => (t.selected = completed));
        this.setIngredientList();
    }
    updateSelect(){
        this.allComplete = this.cartList.filter(t => t.selected === true).length === this.cartList.length;
        this.setIngredientList();
    }
    updateDataSource(){
        this.dataSource = new MatTableDataSource(this.ingredientList)
    }
    getRecipeName(id: number){
        return this.recipeList.filter(e => id == e.id).map(e => e.title)[0];
    }
}
