import {Component, Inject, Input} from '@angular/core';
import {RecipeService} from "../_services/recipe.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../_services/auth.service";
import {Recipe} from "../_models/recipe";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
    constructor(
                public dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.randomizeRecipes(data)
    }
    @Input() recipes: Recipe[] = []; // Array of recipes with image information
    currentImageIndex: number = 0; // Keeps track of the currently displayed image

    randomizeRecipes(recipes: Recipe[]) {
        for (let i = recipes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [recipes[i], recipes[j]] = [recipes[j], recipes[i]];
        }
        this.recipes = recipes;
    }

    ngOnInit(): void { }

    nextImage() {
        if (this.currentImageIndex < this.recipes.length - 1) {
            this.currentImageIndex++;
        }
    }

    previousImage() {
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
        }
    }
}
