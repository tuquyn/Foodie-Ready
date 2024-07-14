import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {RecipeService} from "../_services/recipe.service";

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
    recipeForm: FormGroup;

    constructor(private fb: FormBuilder,
                private recipeService: RecipeService,
    ) {
        this.recipeForm = this.fb.group({
            // id: [null],
            title: [''],
            summary: [''],
            cookingMinutes: [null],
            readyInMinutes: [null],
            instructions: this.fb.array([this.fb.control('')]),
            carbs: [null],
            protein: [null],
            fat: [null],
            ingredients: this.fb.array([this.fb.control('')]),
            image: [''],
            servings: [null],
            dishTypes: this.fb.array([this.fb.control('')]),
        });
    }

    get instructions(): FormArray {
        return this.recipeForm.get('instructions') as FormArray;
    }

    get ingredients(): FormArray {
        return this.recipeForm.get('ingredients') as FormArray;
    }

    get dishTypes(): FormArray {
        return this.recipeForm.get('dishTypes') as FormArray;
    }

    addInstruction() {
        this.instructions.push(this.fb.control(''));
    }

    addIngredient() {
        this.ingredients.push(this.fb.control(''));
    }

    addDishType() {
        this.dishTypes.push(this.fb.control(''));
    }

    onSubmit() {
        console.log(this.recipeForm.value);
        // Add your API call here to save the form data
        this.recipeService.createRecipe(this.recipeForm.value).subscribe(e => {

        })
    }
}
