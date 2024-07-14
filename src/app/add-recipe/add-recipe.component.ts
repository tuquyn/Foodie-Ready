import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../_services/recipe.service";
import {AuthService} from "../_services/auth.service";

@Component({
    selector: 'app-add-recipe',
    templateUrl: './add-recipe.component.html',
    styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit{
    user = null;

    newRecipe = {
        id: null,
        title: '',
        image: '',
        imageType: '',
        servings: null,
        readyInMinutes: null,
        license: '',
        sourceName: '',
        sourceUrl: '',
        spoonacularSourceUrl: '',
        healthScore: null,
        spoonacularScore: null,
        pricePerServing: null,
        analyzedInstructions: [],
        cheap: false,
        creditsText: '',
        cuisines: [],
        dairyFree: false,
        diets: [],
        gaps: '',
        glutenFree: false,
        instructions: '',
        ketogenic: false,
        lowFodmap: false,
        occasions: [],
        sustainable: false,
        vegan: false,
        vegetarian: false,
        veryHealthy: false,
        veryPopular: false,
        whole30: false,
        weightWatcherSmartPoints: null,
        dishTypes: [],
        extendedIngredients: [],
        summary: '',
        winePairing: {
            pairedWines: [],
            pairingText: '',
            productMatches: []
        }
    };
    recipes:any[] = [];

    constructor(private recipeService: RecipeService,
    private authService: AuthService) {

}
    ngOnInit(){
        this.authService.user$.subscribe(e => {
            this.user = e;
        })
    }

    addRecipe() {
        // this.recipeService.addRecipe(this.newRecipe).subscribe(updatedRecipes => {
        //     console.log('Recipe added', updatedRecipes);
        //     let temp = {...this.newRecipe};
        //     this.recipes.push(temp);
        //     console.log(this.recipes)
        // });
    }
    logNewRecipes(){
        console.log(this.recipes)

    }
}
