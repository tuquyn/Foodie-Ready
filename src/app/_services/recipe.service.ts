import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Recipe} from "../_models/recipe";
@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private url = 'http://localhost:5001/api/Recipe';
    private url2 = 'https://api.npoint.io/449f632a819956d63313';

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
    getRecipe(){
        const url = this.url + '/GetAll';
        return this.http.get<any>(url);
    }
    getRecipeInfo(){
        const url = this.url2;
        return this.http.get<any>(url);
    }
}
