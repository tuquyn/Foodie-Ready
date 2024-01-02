import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Recipe} from "../_models/recipe";
@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    // private url = 'http://localhost:5001/api/Recipe';
    private url = 'https://api.npoint.io/5c2d12958fb3e3bbeffe';
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
    getRecipe():Observable<any>{
        return this.http.get<any>(this.url);
    }
    getRecipeInfo(): Observable<any> {
        return this.http.get<any>(this.url2);
    }
    getRecipeList(){
        return this.recipeList$;
    }
    getRecipeListInfo(){
        return this.recipeListInfoSubject;
    }
}
