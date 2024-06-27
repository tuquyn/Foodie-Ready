import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Recipe} from "../_models/recipe";
import {map} from "rxjs/operators";
@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private jsonUrl = 'assets/recipes.json'; // Path to your JSON file

    private url = 'http://localhost:5141/api/Recipe';
    private url2 = 'https://api.npoint.io/75f620a1ca3d0b58ce6b';

    private recipeListSubject = new BehaviorSubject<any>([]);
    recipeList$: Observable<any> = this.recipeListSubject.asObservable();
    private recipeListInfoSubject= new BehaviorSubject<any>([]);
    recipeListInfo$: Observable<any> = this.recipeListInfoSubject.asObservable();
    constructor(private http: HttpClient) {
        this.getRecipe().subscribe(res => {
            this.recipeListSubject.next(res);
        });
        this.getRecipeInfo().subscribe(res => {
            this.recipeListInfoSubject.next(res);
        });
    }
    getRecipes(): Observable<any> {
        return this.http.get(this.jsonUrl);
    }

    addRecipe(newRecipe: any): Observable<any> {
        return this.getRecipes().pipe(
            map((recipes: any[]) => {
                recipes.push(newRecipe);
                // Simulate writing to a file by returning the updated recipes array
                return recipes;
            })
        );
    }
    getRecipe(){
        const url = this.url + '/GetAll';
        return this.http.get<any>(url);
    }
    getRecipeInfo(){
        const url = this.url2;
        return this.http.get<any>(url);
    }
}
