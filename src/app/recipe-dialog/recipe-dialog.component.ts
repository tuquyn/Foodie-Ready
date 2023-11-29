import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Recipe} from "../_models/recipe";

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.css']
})
export class RecipeDialogComponent {
    @Input() recipe: Recipe | undefined;
    // @ts-ignore
    defaultData: Recipe = {
        id: 0,
        name: 'Chocolate Eggnog Recipe',
        description: 'This is the default description.',
        nutrition: [''],
        author: 'anonymous',
        instruction: 'its instruction',
        ingredient: ['5 eggs', '4 cups milk', 'pinch cloves'],

    };
    constructor(
        public dialogRef: MatDialogRef<RecipeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onCancel(): void {
        this.dialogRef.close();
    }
    ngOnInit(): void {
        this.recipe = this.recipe || this.defaultData;
    }
}
