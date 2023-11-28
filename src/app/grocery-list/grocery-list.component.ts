import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from "../models/ingredient";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit{
    @Input() ingredientList: Ingredient[] = [];
    @Input() recipeList: Task[] = [];
    newItem: any = {};
    allComplete: boolean = false;
    displayedColumns: string[] = ['id', 'name', 'quantity', 'unit', 'notes', 'dept'];
    dataSource!: MatTableDataSource<any>;
    // displayedColumns: string[] = ['name', 'quantity']; // Add more column names as needed
    myControl = new FormControl('');
    options: string[] = ['Baking', 'Beverage', 'Canned Goods', 'Dairy', 'Frozen Food', 'Meat', 'Produce', 'Other'];

    ngOnInit(){
        this.recipeList = [
            {id: 1, name: 'Phở', selected: false},
            {id: 2, name: 'Bún', selected: false},
            {id: 3, name: 'Cơm', selected: false},
        ]
        this.ingredientList = [
            { id: 1, name: 'Ingredient 1', quantity: 5, unit: 'kg', notes: '', dept: '' },
            { id: 2, name: 'Ingredient 2', quantity: 10, unit: 'g', notes: '', dept: '' },
            { id: 3, name: 'Ingredient 3', quantity: 2, unit: 'L', notes: '', dept: '' },
        ];

        this.dataSource = new MatTableDataSource(this.ingredientList);
    }
    someComplete(){
        if (this.recipeList == null) {
            return false;
        }
        return this.recipeList.filter(t => t.selected).length > 0 && !this.allComplete;
    }
    setAll(completed: boolean){
        this.allComplete = completed;
        if (this.recipeList == null) {
            return;
        }
        this.recipeList.forEach(t => (t.selected = completed));
    }
    updateSelect(){
        this.allComplete = this.recipeList.filter(t => t.selected === true).length === this.recipeList.length
    }
    onSave(){
        if (this.newItem) {
            this.newItem.id = this.ingredientList.length + 1;
            this.ingredientList.push(this.newItem);
            this.updateDataSource();
        }
        this.newItem = {};
    }
    updateDataSource(){
        this.dataSource = new MatTableDataSource(this.ingredientList);
    }
}
export interface Task{
    id: number,
    name: string,
    selected: boolean,
}
